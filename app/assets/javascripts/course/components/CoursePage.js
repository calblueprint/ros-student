import React from 'react'
import _ from 'underscore'
import request from '../../shared/requests/request'
import { getUser } from '../../utils/user_helpers'

import CourseSidebar from './CourseSidebar'
import ParentComponent from './ParentComponent'
import ComponentGraph from './ComponentGraph'

import { APIRoutes } from '../../shared/routes'


class CoursePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      courseSidebar: {}, // Use courseSidebar.current_subsection
      displayedSection: {},
      displayedSubsection: {},
      activeSubsectionIds: new Set(),
      activeSectionId: {},
      displayedComponent: {},
      nextDisabled: true
    }

    this.displaySubsection = this.displaySubsection.bind(this)
    this.displayComponent = this.displayComponent.bind(this)
    this.displayNextComponent = this.displayNextComponent.bind(this)
    this.displayNextSubsection = this.displayNextSubsection.bind(this)
    this.displayPrevComponent = this.displayPrevComponent.bind(this)
    this.displayPrevSubsection = this.displayPrevSubsection.bind(this)
    this.getDisplayedSection = this.getDisplayedSection.bind(this)
    this.enableNextButton = this.enableNextButton.bind(this)

  }

  componentDidMount() {
    this.requestSidebar()
  }

  displaySubsection(id, componentIndex) {
    const path = APIRoutes.getSubsectionPath(id)

    request.get(path, (response) => {
      const length = response.components.length
      const displayedSection = this.getDisplayedSection(response)
      const displayedComponent = componentIndex == -1 ?
        response.components[length - 1] :
        response.components[componentIndex]

      this.setState({
        displayedSubsection: response,
        displayedComponent: displayedComponent,
        displayedSection: displayedSection
      })
    }, (error) => {
      console.log(error)
    })
  }

  displayComponent(id) {
    function byId(element) {
      return element.id === id
    }
    this.setState({
      displayedComponent: this.state.displayedSubsection.components.find(byId)
    })
  }

  displayNextComponent() {
    this.setState({ nextDisabled: true })
    const subsection = this.state.displayedSubsection
    const component = this.state.displayedComponent
    this.markComponentAsComplete(component)

    if (!this.isLastComponent(subsection, component)) {
      const index = this.getComponentIndex(subsection, component)
      this.displayComponent(subsection.components[index + 1].id)
    } else {
      this.displayNextSubsection()
    }
  }

  displayPrevComponent() {
    const subsection = this.state.displayedSubsection
    const component = this.state.displayedComponent
    if (!this.isFirstComponent(subsection, component)) {
      const index = this.getComponentIndex(subsection, component)
      this.displayComponent(subsection.components[index - 1].id)
    } else {
      this.displayPrevSubsection()
    }
  }

  displayNextSubsection() {
    const displayedSubsection = this.state.displayedSubsection
    const subsections = this.getDisplayedSection(displayedSubsection).subsections
    function next(element, index) {
      if (index > 0 && displayedSubsection.id == subsections[index - 1].id) {
        return element
      }
    }

    const nextSubsection = subsections.find(next)
    if (nextSubsection != null) {
      this.displaySubsection(nextSubsection.id, 0)
      if (!this.isSubsectionCompleted(nextSubsection)) {
        this.state.activeSubsectionIds.add(nextSubsection.id)
      }
    } else {
      this.displayNextSection()
    }
  }

  displayPrevSubsection() {
    const displayedSubsection = this.state.displayedSubsection
    const subsections = this.getDisplayedSection(displayedSubsection).subsections
    function prev(element, index, array) {
      if (index + 1 < array.length && displayedSubsection.id == subsections[index + 1].id) {
        return element
      }
    }

    const prevSubsection = subsections.find(prev)
    if (prevSubsection != null) {
      this.displaySubsection(prevSubsection.id, -1)
    } else {
      this.displayPrevSection()
    }
  }

  displayNextSection() {
    const displayedSection = this.state.displayedSection
    const sections = this.state.courseSidebar.sections

    function next(element, index) {
      if (index > 0 && displayedSection.id == sections[index - 1].id) {
        return element
      }
    }

    const nextSection = sections.find(next)
    if (nextSection != null) {
      this.displaySection(nextSection, 0, 0)
    }
  }

  displayPrevSection() {
    const displayedSection = this.state.displayedSection
    const sections = this.state.courseSidebar.sections

    function prev(element, index, array) {
      if (index + 1 < array.length && displayedSection.id == sections[index + 1].id) {
        return element
      }
    }

    const prevSection = sections.find(prev)
    if (prevSection != null) {
      this.displaySection(prevSection, -1, -1)
    }
  }

  displaySection(section, subsectionIndex, componentIndex) {
    const length = section.subsections.length
    const subsection = subsectionIndex == -1 ?
      section.subsections[length - 1] :
      section.subsections[subsectionIndex]
    if (!this.isSubsectionCompleted(subsection)) {
      this.state.activeSubsectionIds.add(subsection.id)
    }
    this.displaySubsection(subsection.id, componentIndex)
  }

  getDisplayedSection(displayedSubsection) {
    /* Returns the section that the user is currently viewing. */
    return this.state.courseSidebar.sections.find((element) => {
      return element.id === displayedSubsection.section_id
    })
  }

  getComponentIndex(subsection, component) {
    return subsection.components.indexOf(component)
  }

  isLastComponent(subsection, component) {
    return component.position == subsection.components.length
  }

  isFirstComponent(subsection, component) {
    return component.position == 1
  }

  nextDisabled() {
    const component = this.state.displayedComponent
    const subsection_complete = this.state.displayedSubsection.is_complete
    if (subsection_complete) {
      return false
    } else if (component.component_type == 0 && component.audio_url == null) {
      return false
    } else {
      return this.state.nextDisabled
    }
  }

  enableNextButton() {
    this.setState({ nextDisabled: false })
  }

  markComponentAsComplete(component) {
    const path = APIRoutes.createComponentProgressPath(component.id)

    const componentParams = {
      component_progress: {
        component_id: component.id,
        student_id: getUser().id
      }
    }

    request.post(path, componentParams, (response) => {
      this.state.activeSubsectionIds.add(subsection.id)
    }, (error) => {
      console.log(error)
    })
  }

  isSubsectionCompleted(subsection) {
    return this.state.activeSubsectionIds.has(subsection.id)
  }

  requestSidebar() {
    const path = APIRoutes.getStudentCourseSidebarPath(this.props.routeParams.id)
    var add = true
    var lastSectionId = undefined

    request.get(path, (response) => {
      this.setState({ courseSidebar: response.course_sidebar })
      /* Adds all active subsections to set */
      response.course_sidebar.sections.forEach((section) => {
        section.subsections.forEach((subsection) => {
          if (add) {
            this.state.activeSubsectionIds.add(subsection.id)
            lastSectionId = section.id
          }
          if (!subsection.is_complete) {
            add = false
          }
        })
      })
      this.setState({
        activeSectionId: lastSectionId,
        activeSubsectionIds: this.state.activeSubsectionIds
      })
    }, (error) => {
      console.log(error)
    })
  }

  render() {
    return (
      <div className='flex'>
        <div className='course-sidebar-container'>
          <CourseSidebar
            courseSidebar={this.state.courseSidebar}
            displayedSubsection={this.state.displayedSubsection}
            activeSubsectionIds={this.state.activeSubsectionIds}
            activeSectionId={this.state.activeSectionId}
            callback={this.displaySubsection}
          />
        </div>
        <div className='flex component-display-container'>
          <div className='flex flex-vertical flex-grow'>
            <div>
              <ComponentGraph
                subsection={this.state.displayedSubsection}
                displayedComponentId={this.state.displayedComponent.id}
                callback={this.displayComponent}
              />
            </div>

            <div className='flex flex-vertical flex-grow center'>
              <ParentComponent component={this.state.displayedComponent} subsection={this.state.displayedSubsection} onEnd={this.enableNextButton}/>
            </div>

            <div className='flex component-next-container'>
              <button
                disabled={this.nextDisabled()}
                className='button'
                onClick={this.displayNextComponent}>
                Next
              </button>
              <button
                className='marginRight-lg button'
                onClick={this.displayPrevComponent}>
                Previous
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CoursePage

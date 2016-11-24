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
    this.requestSidebar()
  }

  displaySubsection(id, componentIndex) {
    const path = APIRoutes.getSubsectionPath(id)

    request.get(path, (response) => {
      const length = response.subsection.components.length
      const displayedComponent = componentIndex == -1 ?
        response.subsection.components[length - 1] :
        response.subsection.components[componentIndex]

      this.setState({
        displayedSubsection: response.subsection,
        displayedComponent: displayedComponent,
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
    }
  }

  getDisplayedSection(displayedSubsection) {
    /* Returns the section that the user is currently viewing. */
    const sectionId = displayedSubsection.section_id

    function byId(element) {
      return element.id === sectionId
    }

    return this.state.courseSidebar.sections.find(byId)
  }

  getComponentIndex(subsection, component) {
    return subsection.components.indexOf(component)
  }

  isLastComponent(subsection, component) {
    const components = subsection.components
    return component == components[components.length - 1]
  }

  isFirstComponent(subsection, component) {
    return component == subsection.components[0]
  }

  nextDisabled() {
    const component = this.state.displayedComponent
    const subsection_complete = this.state.displayedSubsection.is_complete
    if (subsection_complete || (component.component_type == 0 && component.audio_url == null)) {
      return false
    } else {
      return this.state.nextDisabled
    }
  }

  enableNextButton() {
    this.setState({ nextDisabled: false })

    const subsection = this.state.displayedSubsection
    const component = this.state.displayedComponent

    if (this.isLastComponent(subsection, component)) {
      this.markSubsectionAsComplete(subsection)
    }
  }

  getCurrentSubsection() {
    /* Returns the subsection that the user has progressed to in the course. */
    return this.state.courseSidebar.current_subsection
  }

  getComponentIndex(subsection, component) {
    return subsection.components.indexOf(component)
  }

  isLastComponent(subsection, component) {
    const components = subsection.components
    return component == components[components.length - 1]
  }

  isFirstComponent(subsection, component) {
    return component == subsection.components[0]
  }

  nextDisabled() {
    const component = this.state.displayedComponent
    const subsection_complete = this.state.displayedSubsection.is_complete
    if (subsection_complete || (component.component_type == 0 && component.audio_url == null)) {
      return false
    } else {
      return this.state.nextDisabled
    }
  }

  enableNextButton() {
    this.setState({ nextDisabled: false })

    const subsection = this.state.displayedSubsection
    const component = this.state.displayedComponent

    if (this.isLastComponent(subsection, component)) {
      this.markSubsectionAsComplete(subsection)
    }
  }

  markSubsectionAsComplete(subsection) {
    const path = APIRoutes.createSubsectionProgressPath(subsection.id)

    const componentParams = {
      subsection_progress: {
        subsection_id: subsection.id,
        student_id: getUser().id
      }
    }

    request.post(path, componentParams, (response) => {
    }, (error) => {
      console.log(error)
    })

    // if (this.isLastComponent(subsection, component)) {
    //   this.setSubsectionAsComplete(subsection)
    // }
  }

  requestSidebar() {
    const path = APIRoutes.getStudentCourseSidebarPath(this.props.routeParams.id)

    request.get(path, (response) => {
      console.log(response);
      this.setState({ courseSidebar: response.course_sidebar })
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
            currentSubsection={this.getCurrentSubsection()}
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
              <div>
                <ParentComponent component={this.state.displayedComponent} onEnd={this.enableNextButton}/>
              </div>
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

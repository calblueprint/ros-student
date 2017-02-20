import React from 'react'
import _ from 'underscore'

import request from '../../shared/requests/request'
import { getUser } from '../../utils/user_helpers'
import { APIRoutes } from '../../shared/routes'
import { findById, isFirst, isLast } from '../../utils/course_helpers'
import { isComponentSelfStudy } from '../../utils/component_helpers'
import { Images } from '../../utils/image_helpers'

import CourseSidebar from './CourseSidebar'
import ParentComponent from './ParentComponent'
import ComponentGraph from './ComponentGraph'

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
    this.displayPrevComponent = this.displayPrevComponent.bind(this)
    this.getDisplayedSection = this.getDisplayedSection.bind(this)
    this.enableNextButton = this.enableNextButton.bind(this)
    this.showNextButtonTooltip = this.showNextButtonTooltip.bind(this)
  }

  componentDidMount() {
    this.requestSidebar()
  }

  displayComponent(index) {
    const components = this.state.displayedSubsection.components
    if (!components) {
      return
    }

    this.setState({ displayedComponent: components[index - 1] })
  }

  displaySubsection(id, componentIndex) {
    const path = APIRoutes.getSubsectionPath(id)

    request.get(path, (response) => {
      const length = response.components.length
      const displayedSection = this.getDisplayedSection(response)

      let displayedComponent
      if (!componentIndex && !response.is_complete) {
        displayedComponent = response.current_component
      } else if (response.is_complete || componentIndex == -1) {
        displayedComponent = response.components[length - 1]
      } else {
        displayedComponent = response.components[componentIndex - 1]
      }

      this.setState({
        displayedSubsection: response,
        displayedComponent: displayedComponent,
        displayedSection: displayedSection,
      })
    }, (error) => {
      console.log(error)
    })
  }

  displaySection(index, subsectionIndex, componentIndex) {
    const section = this.state.courseSidebar.sections[index - 1]
    const length = section.subsections.length
    subsectionIndex = subsectionIndex == -1 ? length : subsectionIndex
    const subsection = section.subsections[subsectionIndex - 1]

    const courseSidebar = this.state.courseSidebar
    courseSidebar.current_subsection = subsection
    this.setState({ courseSidebar: courseSidebar })

    this.displaySubsection(subsection.id, componentIndex)
  }

  displayNextComponent() {
    this.setState({ nextDisabled: true })

    const sections = this.state.courseSidebar.sections
    const section = this.state.displayedSection
    const subsection = this.state.displayedSubsection
    const component = this.state.displayedComponent

    if (!component.is_complete) {
      this.markComponentAsComplete(component)
    } else if (!isLast(subsection.components, component)) {
      this.displayComponent(component.position + 1)
    } else if (!isLast(section.subsections, subsection)) {
      const displayedSubsection = section.subsections[subsection.position]
      this.displaySubsection(displayedSubsection.id, 1)
    } else if (!isLast(sections, section)) {
      this.displaySection(section.position + 1, 1, 1)
    }
  }

  displayPrevComponent() {
    const sections = this.state.courseSidebar.sections
    const section = this.state.displayedSection
    const subsection = this.state.displayedSubsection
    const component = this.state.displayedComponent

    if (!isFirst(component)) {
      this.displayComponent(component.position - 1)
    } else if (!isFirst(subsection)) {
      const displayedSubsection = section.subsections[subsection.position - 2]
      this.displaySubsection(displayedSubsection.id, -1)
    } else if (!isFirst(section)) {
      this.displaySection(section.position - 1, -1, -1)
    }
  }

  getDisplayedSection(displayedSubsection) {
    /* Returns the section that the user is currently viewing. */
    return this.state.courseSidebar.sections.find((element) => {
      return element.id === displayedSubsection.section_id
    })
  }

  nextDisabled() {
    const component = this.state.displayedComponent
    if (!component) {
      return true
    } else if (component.is_complete) {
      return false
    } else if (isComponentSelfStudy(component)) {
      return false
    } else {
      return this.state.nextDisabled
    }
  }

  enableNextButton() {
    this.setState({ nextDisabled: false })
  }

  showNextButtonTooltip() {
    const component = this.state.displayedComponent
    const display = (this.nextDisabled() && component &&
      (component.component_type == 2 || component.audio_url)) ? 'inline' : 'none'

    return ({
      display: `${display}`
    })
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
      if (response.is_complete) {
        this.markSubsectionComplete(response)
      } else {
        this.setState({
          displayedSubsection: response,
          displayedComponent: response.current_component,
        })
      }
    }, (error) => {
      console.log(error)
    })
  }

  markSubsectionComplete(subsection) {
    const courseSidebar = this.state.courseSidebar
    const sections = courseSidebar.sections

    if (!sections) {
      return
    }

    const section = sections.find((section) => {
      return section.id == subsection.section_id
    })
    if (!section) {
      return
    }

    section.subsections[subsection.position - 1] = subsection
    courseSidebar.sections[section.position - 1] = section

    if (!isLast(section.subsections, subsection)) {
      const displayedSubsection = section.subsections[subsection.position]

      courseSidebar.current_subsection = displayedSubsection
      this.setState({ courseSidebar: courseSidebar })

      this.displaySubsection(displayedSubsection.id, 1)
    } else if (!isLast(sections, section)) {
      this.displaySection(section.position + 1, 1, 1)
    }
  }

  requestSidebar() {
    const path = APIRoutes.getStudentCourseSidebarPath(this.props.routeParams.id)
    request.get(path, (response) => {
      const currentSubsection = response.course_sidebar.current_subsection
      if (currentSubsection) {
        this.displaySubsection(currentSubsection.id)
      }

      this.setState({
        courseSidebar: response.course_sidebar,
        displayedSubsection: currentSubsection,
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
            callback={this.displaySubsection}
          />
        </div>
        <div className='component-display-container'>

          <div className='flex flex-vertical center'>
            <ComponentGraph
              subsection={this.state.displayedSubsection}
              displayedComponent={this.state.displayedComponent}
              callback={this.displayComponent}
            />

            <ParentComponent
              component={this.state.displayedComponent}
              subsection={this.state.displayedSubsection}
              onEnd={this.enableNextButton}
            />

            <div className='flex marginTopBot-md'>
              <button
                className='marginRight-lg course-navigation-button'
                onClick={this.displayPrevComponent}>
                <img
                  src={Images.left_arrow}
                />
              </button>

              <div className='tooltip'>
                <button
                  disabled={this.nextDisabled()}
                  className='course-navigation-button'
                  onClick={this.displayNextComponent}>
                  <span
                    className='tooltip tooltiptext right'
                    style={this.showNextButtonTooltip()}>
                    Please finish the clip before continuing
                  </span>
                  <img
                    src={Images.right_arrow}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CoursePage

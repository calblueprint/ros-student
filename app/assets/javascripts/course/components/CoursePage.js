import React from 'react'
import _ from 'underscore'

import request from '../../shared/requests/request'
import { getUser } from '../../utils/helpers/user_helpers'
import { APIRoutes } from '../../shared/routes'
import { findById, isFirst, isLast } from '../../utils/helpers/course_helpers'
import { Images } from '../../utils/helpers/image_helpers'

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

  /**
    * Sets up course sidebar and displays current subsection
    */
  componentDidMount() {
    const path = APIRoutes.getStudentCourseSidebarPath(this.props.routeParams.id)

    request.get(path, (response) => {
      const currentSubsection = response.course_sidebar.current_subsection

      this.setState({
        courseSidebar: response.course_sidebar,
        displayedSubsection: currentSubsection,
      }, () => {
        if (currentSubsection) {
          this.displaySubsection(currentSubsection.id)
        }
      })
    }, (error) => {
      console.log(error)
    })
  }

  /**
    * Displays component at the given position in the displayedSubsection list
    */
  displayComponent(position) {
    const components = this.state.displayedSubsection.components
    if (!components) {
      return
    }

    this.setState({ displayedComponent: components[position - 1] })
  }

  /**
    * Makes an API call to get the subsection with the given id. Sets the subsection's
    * section as displayedSection.
    * Sets displayedComponent based on given componentPosition.
    */
  displaySubsection(id, componentPosition) {
    const path = APIRoutes.getSubsectionPath(id)

    request.get(path, (response) => {
      const length = response.components.length

      const displayedSection = this.getDisplayedSection(response)

      let displayedComponent
      // If subsection is incomplete and componentPosition is null, use response.current_component
      if (!componentPosition && !response.is_complete) {
        displayedComponent = response.current_component
      // If subsection is complete and componentPosition is -1, get the last component
      } else if (response.is_complete || componentPosition == -1) {
        displayedComponent = response.components[length - 1]
      // If componentPosition is given, set displayedComponent based on given position
      } else {
        displayedComponent = response.components[componentPosition - 1]
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

  /**
    * Calls displaySubsection based on given subsectionPosition, which sets this section as displayedSection
    */
  displaySection(position, subsectionPosition, componentPosition) {
    const section = this.state.courseSidebar.sections[position - 1]
    const length = section.subsections.length
    subsectionPosition = subsectionPosition == -1 ? length : subsectionPosition
    const subsection = section.subsections[subsectionPosition - 1]

    this.displaySubsection(subsection.id, componentPosition)
  }

  /**
    * Gets and displays the next component and possibly next subsection and/or section
    */
  displayNextComponent() {
    this.setState({ nextDisabled: true })
    console.log("here")
    //console.log(this.state.courseSidebar.course)

    const sections = this.state.courseSidebar.sections
    const section = this.state.displayedSection
    const subsection = this.state.displayedSubsection
    const component = this.state.displayedComponent

    // If not the last component, display next component in subsection
    if (!isLast(subsection.components, component)) {
      this.displayComponent(component.position + 1)

    // If it is the last component but not last subsection, display the next subsection in section
    } else if (!isLast(section.subsections, subsection)) {
      const displayedSubsection = section.subsections[subsection.position]
      this.displaySubsection(displayedSubsection.id, 1)

    // If it is the last subsection but current section is not the last section
    } else if (!isLast(sections, section)) {
      this.displaySection(section.position + 1, 1, 1)
    } else {
      console.log("here")
      const path = APIRoutes.finishedCoursePath(this.state.courseSidebar.course)
      const updateParams = {
        sent_email: true,
      }
      request.update(path, updateParams, (response) => {
        console.log(response)
      }, (error) => {
        console.log(error)
      })
    }
  }

  /**
    * Displays the previous component
    */
  displayPrevComponent() {
    const sections = this.state.courseSidebar.sections
    const section = this.state.displayedSection
    const subsection = this.state.displayedSubsection
    const component = this.state.displayedComponent

    // If component is not the first in its subsection, display previous component in subsection
    if (!isFirst(component)) {
      this.displayComponent(component.position - 1)

    // If component is first in its subsection, but its subsection is not first,
    // display the last component in the previous subsection
    } else if (!isFirst(subsection)) {
      const displayedSubsection = section.subsections[subsection.position - 2]
      this.displaySubsection(displayedSubsection.id, -1)

    // If subsection is first in its section, but the section is not first,
    // display the last component of the last subsection of the previous section
    } else if (!isFirst(section)) {
      this.displaySection(section.position - 1, -1, -1)
    }
  }

  /**
    * Returns section that belongs to the given subsection
    */
  getDisplayedSection(displayedSubsection) {
    /* Returns the section that the user is currently viewing. */
    return this.state.courseSidebar.sections.find((element) => {
      return element.id === displayedSubsection.section_id
    })
  }

  /**
    * Disables the next button if component is null and enables it
    * if the component is complete. Otherwise, it returns this.state.nextDisabled.
    */
  nextDisabled() {
    const component = this.state.displayedComponent
    if (!component) {
      return true
    } else if (component.is_complete) {
      return false
    } else {
      return this.state.nextDisabled
    }
  }

  /**
    * Disables the prev button if component is the first in the course
    */
  prevDisabled() {
    if (!this.state.courseSidebar.sections || !this.state.displayedSubsection.components) {
      return false
    }

    const subsectionId = this.state.courseSidebar.sections[0].subsections[0].id

    const displayedSubsection = this.state.displayedSubsection
    const componentId = this.state.displayedSubsection.components[0].id

    return (displayedSubsection.id == subsectionId) && (componentId == this.state.displayedComponent.id)
  }

  /**
    * Callback when displayedComponent completes. On completion, the next button is enabled
    * and if displayedComponent is not complete yet, mark it as complete.
    */
  enableNextButton() {
    this.setState({ nextDisabled: false })
    if (!this.state.displayedComponent.is_complete) {
      this.markComponentAsComplete(this.state.displayedComponent)
    }
  }

  /**
    * Returns whether the courseSidebar's course is self paced
    */
  isSelfPaced() {
    return this.state.courseSidebar.self_paced
  }

  /**
    * Display next button tooltip if next is disabled
    */
  showNextButtonTooltip() {
    const component = this.state.displayedComponent
    const display = (this.nextDisabled() && component) ? 'inline' : 'none'

    return ({
      display: `${display}`
    })
  }

  /**
    * Make an API post request to mark component as complete. Update the sidebar,
    * displayedComponent, and displayedSubsection accordingly
    */
  markComponentAsComplete(component) {
    // Create a component_progress object for this component to indicate completion
    const path = APIRoutes.createComponentProgressPath(component.id)

    const componentParams = {
      component_progress: {
        component_id: component.id,
        student_id: getUser().id
      }
    }

    request.post(path, componentParams, (response) => {
      // Mark displayedComponent as complete
      const component = this.state.displayedComponent
      component.is_complete = true

      // Update displayedSubsection's components and current_component based on response
      const subsection = this.state.displayedSubsection
      subsection.components = response.components
      subsection.current_component = response.current_component

      const courseSidebar = this.state.courseSidebar
      const section = courseSidebar.sections[this.state.displayedSection.position - 1]

      // If displayedSubsection is complete, mark it and update the sidebar with the next current_subsection
      if (response.is_complete) {
        subsection.is_complete = true

        const nextSubsection = this.getNextSubsection(section, subsection)
        courseSidebar.current_subsection = nextSubsection
      }

      section.subsections[this.state.displayedSubsection.position - 1] = subsection
      courseSidebar.sections[this.state.displayedSection.position - 1] = section

      this.setState({
        displayedComponent: component,
        displayedSubsection: subsection,
        courseSidebar: courseSidebar,
      })

    }, (error) => {
      console.log(error)
    })
  }

  /**
    * Gets the next subsection after the given subsection in the given section
    */
  getNextSubsection(section, subsection) {
    if (!section || !subsection) {
      return
    }

    // If not the last subsection in section, return the next subsection in section
    if (!isLast(section.subsections, subsection)) {
      const nextSubsection = section.subsections[subsection.position]
      return nextSubsection
    // If the last subsection, but section is not the last in the course, return
    // the first subsection in the next section
    } else if (!isLast(this.state.courseSidebar.sections, section)) {
      const nextSection = this.state.courseSidebar.sections[section.position]
      const nextSubsection = nextSection.subsections[0]
      return nextSubsection
    // If this is the last subsection and section in the course, return the given subsection
    } else {
      return subsection
    }
  }

  render() {
    return (
      <div className='flex'>
        <div className='course-sidebar-container'>
          <CourseSidebar
            courseId={this.props.routeParams.id}
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
              selfPaced={this.isSelfPaced()}
            />

            <div className='flex marginTopBot-md'>
              <button
                id='previous-button'
                disabled={this.prevDisabled()}
                className='marginRight-lg course-navigation-button'
                onClick={this.displayPrevComponent}>
                <img src={Images.left_arrow} />
              </button>

              <div className='tooltip'>
                <button
                  id='next-button'
                  disabled={this.nextDisabled()}
                  className='course-navigation-button'
                  onClick={this.displayNextComponent}>
                  <span
                    className='tooltip tooltiptext right'
                    style={this.showNextButtonTooltip()}>
                    Please finish before continuing
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

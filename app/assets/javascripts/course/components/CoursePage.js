import React from 'react'

import request from '../../shared/requests/request'

import CourseSidebar from './CourseSidebar'
import ParentComponent from './ParentComponent'
import ComponentGraph from './ComponentGraph'

import { APIRoutes } from '../../shared/routes'


class CoursePage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      courseSidebar: {},
      displayedSection: {},
      displayedSubsection: {},
      displayedComponent: {}
    }

    this.displaySubsection = this.displaySubsection.bind(this)
    this.displayComponent = this.displayComponent.bind(this)
    this.displayNextComponent = this.displayNextComponent.bind(this)
    this.displayNextSubsection = this.displayNextSubsection.bind(this)
    this.displayPrevComponent = this.displayPrevComponent.bind(this)
    this.displayPrevSubsection = this.displayPrevSubsection.bind(this)
    this.getDisplayedSection = this.getDisplayedSection.bind(this)

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
    var components = this.state.displayedSubsection.components;

    var index = components.indexOf(this.state.displayedComponent)
    if (index + 1 < components.length) {
      this.displayComponent(components[index + 1].id)
    } else {
      this.displayNextSubsection()
    }
  }

  displayNextSubsection() {
    var displayedSubsection = this.state.displayedSubsection
    var subsections = this.getDisplayedSection(displayedSubsection).subsections
    function next(element, index) {
      if (index > 0 && displayedSubsection.id == subsections[index - 1].id) {
        return element
      }
    }

    var nextSubsection = subsections.find(next)
    if (nextSubsection != null) {
      this.displaySubsection(nextSubsection.id, 0)
    }
  }

  displayPrevComponent() {
    var components = this.state.displayedSubsection.components;

    var index = components.indexOf(this.state.displayedComponent)
    if (index - 1 >= 0) {
      this.displayComponent(components[index - 1].id)
    } else {
      this.displayPrevSubsection()
    }
  }

  displayPrevSubsection() {
    var displayedSubsection = this.state.displayedSubsection
    var subsections = this.getDisplayedSection(displayedSubsection).subsections
    function prev(element, index, array) {
      if (index + 1 < array.length && displayedSubsection.id == subsections[index + 1].id) {
        return element
      }
    }

    var prevSubsection = subsections.find(prev)
    if (prevSubsection != null) {
      this.displaySubsection(prevSubsection.id, -1)
    }
  }

  getDisplayedSection(displayedSubsection) {
    var sectionId = displayedSubsection.section_id
    function byId(element) {
      return element.id === sectionId
    }

    return this.state.courseSidebar.sections.find(byId)
  }

  requestSidebar() {
    const path = APIRoutes.getStudentCourseSidebarPath(this.props.routeParams.id)

    request.get(path, (response) => {
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
                <ParentComponent component={this.state.displayedComponent}/>
              </div>
            </div>

            <div className='flex component-next-container'>
              <button
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

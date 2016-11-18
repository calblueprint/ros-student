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
      courseSidebar: this.requestSidebar(),
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
  }

  displaySubsection(id, componentIndex) {
    const path = APIRoutes.getSubsectionPath(id)

    request.get(path, (response) => {
      var length = response.subsection.components.length
      if (componentIndex == -1) {
        this.setState({ displayedComponent: response.subsection.components[length - 1]})
      } else {
        this.setState({ displayedComponent: response.subsection.components[componentIndex]})
      }
      this.setState({ displayedSubsection: response.subsection })
    }, (error) => {
      console.log(error)
    })
  }

  displayComponent(id) {
    function byId(element) {
      return element.id === id
    }

    this.setState({ displayedComponent: this.state.displayedSubsection.components.find(byId)})
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
      <div>
        <h1>This is a course page</h1>
        <ParentComponent component={this.state.displayedComponent}/>
        <ComponentGraph subsection={this.state.displayedSubsection} callback={this.displayComponent}/>
        <button onClick={this.displayPrevComponent}>Previous</button>
        <button onClick={this.displayNextComponent}>Next</button>
        <CourseSidebar courseSidebar={this.state.courseSidebar} callback={this.displaySubsection}/>
      </div>
    )
  }
}

export default CoursePage

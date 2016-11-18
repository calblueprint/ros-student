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
      displayed_section: null,
      displayed_subsection: null,
      displayed_component: {}
    }

    this.changeDisplayedSubsection = this.changeDisplayedSubsection.bind(this)
    this.changeDisplayedSubsectionStartingFromLastComponent = this.changeDisplayedSubsectionStartingFromLastComponent.bind(this)
    this.changeDisplayedComponent = this.changeDisplayedComponent.bind(this)
    this.displayNextComponent = this.displayNextComponent.bind(this)
    this.displayPreviousComponent = this.displayPreviousComponent.bind(this)
  }

  changeDisplayedSubsection(id) {
    const path = APIRoutes.getSubsectionPath(id)

    request.get(path, (response) => {
      this.setState({ displayed_component: response.subsection.components[0]})
      this.setState({ displayed_subsection: response.subsection })
    }, (error) => {
      console.log(error)
    })
  }

  changeDisplayedSubsectionStartingFromLastComponent(id) {
    const path = APIRoutes.getSubsectionPath(id)

    request.get(path, (response) => {
      var indexOfLastComponent = response.subsection.components.length - 1
      this.setState({ displayed_component: response.subsection.components[indexOfLastComponent]})
      this.setState({ displayed_subsection: response.subsection })
    }, (error) => {
      console.log(error)
    })
  }

  changeDisplayedComponent(id) {
    var targetComponent = null

    for (var component of this.state.displayed_subsection.components) {
      if (component.id == id) {
        targetComponent = component
        break
      }
    }

    this.setState({ displayed_component: targetComponent})
  }

  displayNextComponent() {
    var components = this.state.displayed_subsection.components;
    for (var index = 0; index < components.length; index++) {
      if (components[index].id == this.state.displayed_component.id) {
        if (index + 1 < components.length) {
          this.changeDisplayedComponent(components[index + 1].id)
          return
        }
      }
    }

    var subsections = this.getCurrentSection(this.state.displayed_subsection.section_id).subsections
    for (var index = 0; index < subsections.length; index++) {
      if (subsections[index].id == this.state.displayed_subsection.id) {
        if (index + 1 < subsections.length) {
          this.changeDisplayedSubsection(subsections[index + 1].id)
          return
        }
      }
    }
  }

  displayPreviousComponent() {
    var components = this.state.displayed_subsection.components;
    for (var index = 0; index < components.length; index++) {
      if (components[index].id == this.state.displayed_component.id) {
        if (index - 1 >= 0) {
          this.changeDisplayedComponent(components[index - 1].id)
          return
        }
      }
    }

    var subsections = this.getCurrentSection(this.state.displayed_subsection.section_id).subsections
    for (var index = 0; index < subsections.length; index++) {
      if (subsections[index].id == this.state.displayed_subsection.id) {
        if (index - 1 >= 0) {
          this.changeDisplayedSubsectionStartingFromLastComponent(subsections[index - 1].id)
          return
        }
      }
    }
  }

  getCurrentSection(secId) {
    for (var section of this.state.courseSidebar.sections) {
      if (section.id == secId) {
        return section
      }
    }
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
        <ParentComponent component={this.state.displayed_component}/>
        <ComponentGraph subsection={this.state.displayed_subsection} callback={this.changeDisplayedComponent}/>
        <button onClick={this.displayPreviousComponent}>Previous</button>
        <button onClick={this.displayNextComponent}>Next</button>
        <CourseSidebar courseSidebar={this.state.courseSidebar} callback={this.changeDisplayedSubsection}/>
      </div>
    )
  }
}

export default CoursePage

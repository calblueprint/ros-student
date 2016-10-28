import _ from 'underscore'
import React from 'react'

import { Link } from 'react-router'

import request from '../../shared/requests/request'

import { getUser } from '../../utils/user_helpers'
import { RailsRoutes, ReactRoutes } from '../../shared/routes'
import { APIRoutes } from '../../shared/routes'
import SectionSidebar from './SectionSidebar'
import Dropdown from '../../shared/components/widgets/Dropdown'

class CourseSidebar extends React.Component {

  constructor(props) {
    super(props)

    this.id = 2 //this.props.routeParams.id

    this.state = {
      courseSidebar: {}
    }

    this.requestSidebar()
  }

  requestSidebar() {
    const path = APIRoutes.getCourseSidebarPath(this.id)

    request.get(path, (response) => {
      console.log(response)
      this.setState({ courseSidebar: response.course_sidebar })
    }, (error) => {
      console.log(error)
    })
  }

  renderSections() {
    if (_.isEmpty(this.state.courseSidebar.sections)) {
      return "Loading"
    } else {
      return this.state.courseSidebar.sections.map((value) => {
        return <SectionSidebar key={value.id} section={value} current_subsection={this.state.courseSidebar.current_subsection} />
      })
    }
  }

  render() {
    return (
      <div>
        <h1>{this.state.courseSidebar.name}</h1>
        <div>{this.state.courseSidebar.description}</div>
        <div>{this.renderSections()}</div>
      </div>
    )
  }
}

export default CourseSidebar

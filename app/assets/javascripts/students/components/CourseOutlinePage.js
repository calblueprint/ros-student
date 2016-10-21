import _ from 'underscore'

import React from 'react'
import { Link } from 'react-router'

import request from '../../shared/requests/request'

import { getUser } from '../../utils/user_helpers'
import { RailsRoutes, ReactRoutes } from '../../shared/routes'
import { APIRoutes } from '../../shared/routes'
import SectionOutline from './SectionOutline'

class CourseOutlinePage extends React.Component {

  constructor(props) {
    super(props)

    this.id = this.props.routeParams.id

    this.state = {
      courseOutline: {}
    }

    this.requestOutline()
  }

  requestOutline() {
    const path = APIRoutes.getCourseOutlinePath(this.id)

    request.get(path, (response) => {
      console.log(response)
      this.setState({ courseOutline: response.course_outline })
    }, (error) => {
      console.log(error)
    })
  }

  renderSections() {
    if (_.isEmpty(this.state.courseOutline.sections)) {
      return "Loading"
    } else {
      return this.state.courseOutline.sections.map((value) => {
        return <SectionOutline key={value.id} section={value} />
      })
    }
  }

  render() {
    return (
      <div>
        <h1>{this.state.courseOutline.name}</h1>
        <div>{this.state.courseOutline.description}</div>
        <ol>{this.renderSections()}</ol>

        <a href={RailsRoutes.coursePath(this.state.courseOutline.id)}>Continue</a>
      </div>
    )
  }
}

export default CourseOutlinePage

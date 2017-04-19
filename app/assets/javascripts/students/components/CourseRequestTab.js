/**
 * Component of `AddCoursesPage` that allows students to request for courses
 * through selecting from the catalong. The other tab on the page uses codes.
 * Students can view and select any subset of the published courses and hit
 * submit, which will render a request viewable to all admins.
 */

import React from 'react'
import _ from 'underscore'

import { APIRoutes } from '../../shared/routes'
import request from '../../shared/requests/request'

import StudentCourseRequestCard from './StudentCourseRequestCard'
import Form from '../../shared/components/forms/Form'
import Input from '../../shared/components/forms/Input'
import SaveButton from '../../shared/components/widgets/SaveButton'
import { getInputToParams } from '../../utils/helpers/form_helpers'

class CourseRequestTab extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      courses: [],
      activeCourseIds: new Set(),
    }

    this._mounted = false

    this.generateRequests = this.generateRequests.bind(this)
    this.switchCourseSelectedState = this.switchCourseSelectedState.bind(this)
  }

  componentDidMount() {
    this.getCourses()
    this._mounted = true
  }

  componentWillUnmount() {
    this._mounted = false
  }

  getCourses() {
    const path = APIRoutes.getPublishedCourses()
    request.get(path, (response) => {
      this._mounted && this.setState({ courses: response.courses })
    }, (error) => {
      console.log(error)
    })
  }

  /**
   * Removes `course` if already in this.state.activeCourseIds
   * Otherwise adds `course` to this.state.activeCourseIds
   */
  switchCourseSelectedState(courseId) {
    var activeCourseIds = this.state.activeCourseIds
    if (activeCourseIds.has(courseId)) {
      activeCourseIds.delete(courseId)
    } else {
      activeCourseIds.add(courseId)
    }
    this.setState({ activeCourseIds: activeCourseIds })
  }

  resetAllSelectedStates() {
    this.setState({ activeCourseIds: new Set() })
  }

  generateRequests(event, onSuccess, onFailure) {
    event.preventDefault()
    const path = APIRoutes.courseRequestPath()
    var params = {
      request: {
        course_ids: [...this.state.activeCourseIds],
      },
    }
    request.post(path, params, (response) => {
      onSuccess && onSuccess()
      this.resetAllSelectedStates()
    }, (error) => {
      console.log(error)
      onFailure && onFailure()
    })
  }

  renderCourses() {
    if (_.isEmpty(this.state.courses)) {
      return (
        <div className='student-course-request-placeholder'>
          <i className='fa fa-spinner fa-pulse save-button-icon'></i>
          Loading all courses...
        </div>
      )
    }
    return this.state.courses.map((value) => {
      return (
        <StudentCourseRequestCard
          course={value}
          selected={this.state.activeCourseIds.has(value.id)}
          updateSelected={this.switchCourseSelectedState}
        />
      )
    })
  }

  render() {
    return (
      <div>
        {this.renderCourses()}
        <SaveButton
          className='marginTop-md marginBot-xl submit-request-button'
          text='Submit request'
          onPress={this.generateRequests}
          disabled={this.state.activeCourseIds.size === 0}
        />
      </div>
    )
  }
}

export default CourseRequestTab

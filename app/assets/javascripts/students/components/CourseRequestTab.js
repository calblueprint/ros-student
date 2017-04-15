import React from 'react'
import { APIRoutes } from '../../shared/routes'
import request from '../../shared/requests/request'
import _ from 'underscore'
import Form from '../../shared/components/forms/Form'
import Input from '../../shared/components/forms/Input'
import SaveButton from '../../shared/components/widgets/SaveButton'
import { getInputToParams } from '../../utils/helpers/form_helpers'

class CourseRequestTab extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      formFields: {
        course_ids: {
          value: '',
          name: 'Course Ids',
          onChange: _.bind(this.handleChange, this, 'course_ids')
        },
      },
      courses: [],
    }

    this.generateRequests = _.bind(this.generateRequests, this)
  }

  componentDidMount() {
    this.getCourses()
  }

  handleChange(attr, e) {
    const formFields = this.state.formFields
    formFields[attr].value = e.target.value
    this.setState({ formFields: formFields })
  }

  getCourses() {
    const path = APIRoutes.getPublishedCourses()

    request.get(path, (response) => {
      //_.every(enrolledList, (course) => { return course.progress === 100; }) ? "inline" : "none"
      this.setState({ courses: response.courses })
      console.log(response.courses)
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
    console.log(this.state.activeCourseIds)
    console.log(this.state.activeCourseIds.size)
  }

  generateRequests(event, onSuccess, onFailure) {
    event.preventDefault()
    const path = APIRoutes.courseRequestPath()
    var params = {
      request: {
        course_ids: JSON.stringify([...this.state.activeCourseIds])
      },
    }
    console.log(params)
    request.post(path, params, (response) => {
      onSuccess && onSuccess()
    }, (error) => {
      console.log(error)
      onFailure && onFailure()
    })
  }

  renderCourses() {
    return this.state.courses.map((value) => {
      return (
        <li key={value.id}>{value.name+" "+value.id}</li>
      )
    })
  }

  render() {
    return (
      <div>
        {this.renderCourses()}
        <SaveButton
          text='Submit Requests'
          onPress={this.generateRequests}
          disabled={this.state.activeCourseIds.size === 0}
        />
      </div>
    )
  }

}

export default CourseRequestTab

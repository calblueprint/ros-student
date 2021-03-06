/**
 * Page on admin-side that allows admins to review student requests and either
 * approve or reject them. A message is allowed to be included, which will be
 * emailed to the student upon the request being accepted or rejected. Data and
 * most logic is handled in `AdminCourseRequestCard`.
 */

import React from 'react'
import _ from 'underscore'

import { APIRoutes } from '../../shared/routes'
import request from '../../shared/requests/request'

import Form from '../../shared/components/forms/Form'
import Input from '../../shared/components/forms/Input'
import SaveButton from '../../shared/components/widgets/SaveButton'
import { getInputToParams } from '../../utils/helpers/form_helpers'
import AdminCourseRequestCard from './AdminCourseRequestCard'

class CourseRequestApprovePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      requests: [],
      activeRequestId: null,
    }

    this._mounted = false
    this.setActiveRequest = this.setActiveRequest.bind(this)
    this.completeRequest = this.completeRequest.bind(this)
  }

  componentDidMount() {
    this.getRequests()
    this._mounted = true
  }

  componentWillUnmount() {
    this._mounted = false
  }

  getRequests() {
    const path = APIRoutes.getIncompleteRequestsPath()
    request.get(path, (response) => {
      this._mounted && this.setState({ requests: response.requests })
    }, (error) => {
      console.log(error)
    })
  }

  setActiveRequest(id) {
    if (id === this.state.activeRequestId) {
      this.setState({ activeRequestId: null })
    } else {
      this.setState({ activeRequestId: id })
    }
  }

  completeRequest(id) {
    this.setState({
      requests: this.state.requests.filter((request) => {
        return request.id != id
      }),
      activeRequestId: null,
    })
  }

  renderRequests() {
    if (_.isEmpty(this.state.requests)) {
      return (
        <div className='course-request-approval-page-placeholder'>
          No student requests at the moment!
        </div>
      )
    }
    return this.state.requests.map((value) => {
      return (
        <AdminCourseRequestCard
          id={value.id}
          student={value.student}
          courses={value.courses}
          key={value.id}
          setActive={this.setActiveRequest}
          isActive={this.state.activeRequestId === value.id}
          updateRequestPath={APIRoutes.requestUpdatePath(value.id)}
          callback={this.completeRequest}
        />
      )
    })
  }

  render() {
    return (
      <div className='container marginBot-xxl'>
        <div className='course-request-approval-page-header'>
          Student Course Requests
        </div>
        {this.renderRequests()}
      </div>
    )
  }
}

export default CourseRequestApprovePage

/**
 * Card on admin-side that shows information about a students request to
 * enroll in additional courses. Contains info about the student (name, email)
 * as well as a list of all the courses that they wish to add. Upon clicking
 * the card, a collapse will expand with a field for a message to go along with
 * accepting or rejecting the request. If the request is accepted, then the
 * student will be automatically enrolled in those courses selected.
 *
 * @prop id                 - ID associated with this request
 * @prop student            - object containing information about the student
 *                            who submitted the request
 * @prop courses            - array of course objects containing the titles of
 *                            all courses that the student is requesting
 * @prop setActive          - callback that tells parent the currently active
 *                            card
 * @prop isActive           - bool indicating whether current card is 'opened'
 * @prop updateRequestPath  - string with API route to updating the request
 */

import React, { PropTypes } from 'react'
import Collapse from 'react-collapse'
import _ from 'underscore'

import request from '../../shared/requests/request'
import { Images } from '../../utils/helpers/image_helpers'
import Image from '../../shared/components/widgets/Image'
import Form from '../../shared/components/forms/Form'
import Input from '../../shared/components/forms/Input'
import { getInputToParams } from '../../utils/helpers/form_helpers'

class AdminCourseRequestCard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      formFields: this.getFormFields(),
    }

    this.requestStates = {
      INCOMPLETE: 0,
      REJECTED: 1,
      ACCEPTED: 2,
    }

    this.handleClick = this.handleClick.bind(this)
    this.approveRequest = this.approveRequest.bind(this)
    this.rejectRequest = this.rejectRequest.bind(this)
  }

  getFormFields() {
    return {
      message: {
        label: '',
        value: '',
        name: 'Request message',
        onChange: _.bind(this.handleChange, this, 'message')
      },
    }
  }

  getImgStyle() {
    const image_url = this.props.student.image_url ?
      this.props.student.image_url :
      Images.default_profile

    return image_url
  }

  getCardStyle() {
    return this.props.isActive ?
      'admin-course-request-card active' :
      'admin-course-request-card'
  }

  getRequestCourses() {
    return this.props.courses.map((course) => {
      return (
        <div className='course-name' key={course.id}>
          {course.name}
        </div>
      )
    })
  }

  handleChange(attr, e) {
    const formFields = this.state.formFields
    formFields[attr].value = e.target.value
    this.setState({ formFields: formFields })
  }

  handleClick(event) {
    event.preventDefault()
    this.props.setActive(this.props.id)
  }

  approveRequest(event) {
    event.preventDefault()
    this.updateRequest({
      update_params: {
        state: this.requestStates.ACCEPTED,
        message: this.state.formFields.message.value,
      }
    })
  }

  rejectRequest(event) {
    event.preventDefault()
    this.updateRequest({
      update_params: {
        state: this.requestStates.REJECTED,
        message: this.state.formFields.message.value, 
      }
    })
  }

  updateRequest(params) {
    const path = this.props.updateRequestPath
    request.update(path, params, (response) => {
      this.props.callback(this.props.id)
    }, (error) => {
      console.log(error)
    })
  }

  renderFields() {
    return (
      _.pairs(this.state.formFields).map((values) => {
        return (
          <Input
            style="fill marginBot-xxs message-input"
            multiline={2}
            key={values[0]}
            {...values[1]}
          />
        )
      })
    )
  }

  render() {
    return (
      <div className='admin-course-request-card-container'>
        <div
          className={this.getCardStyle()}
          onClick={this.handleClick}
        >
          <div className='course-request-id'>
            {`#${this.props.id}`}
          </div>
          <div className='student-image-container'>
            <Image
              src={this.getImgStyle()}
              img_style="student-image"
            />
          </div>
          <div className='student-request-info-container'>
            <span className='student-name'>
              {`${this.props.student.first_name} ${this.props.student.last_name}`}
            </span>
            <span className='student-email'>
              {this.props.student.email}
            </span>
          </div>
          <div className='student-request-courses-container'>
            {this.getRequestCourses()}
          </div>
        </div>

        <Collapse isOpened={this.props.isActive}>
          <div className='admin-course-request-card-controls'>
            <div className='left-container'>
              <div className='directions-text'>
                Write a message here and either approve or reject this request.
              </div>
              <form className='message-form'>
                {this.renderFields()}
              </form>
            </div>
            <div className='right-container flex center'>
              <button
                className='course-request-icon-button approve marginRight-sm tooltip'
                onClick={this.approveRequest}
              >
                <i className='fa fa-check' aria-hidden='true'></i>
                <span className='tooltiptext top course-request-tooltip'>Approve</span>
              </button>
              <button
                className='course-request-icon-button reject tooltip'
                onClick={this.rejectRequest}
              >
                <i className='fa fa-times' aria-hidden='true'></i>
                <span className='tooltiptext top course-request-tooltip'>Reject</span>
              </button>
            </div>
          </div>
        </Collapse>
      </div>
    )
  }
}

AdminCourseRequestCard.propTypes = {
  id: PropTypes.number.isRequired,
  student: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    image_url: PropTypes.string,
  }),
  courses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })),
  setActive: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  updateRequestPath: PropTypes.string.isRequired,
}

export default AdminCourseRequestCard

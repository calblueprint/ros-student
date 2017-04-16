import React, { PropTypes } from 'react'
import Collapse from 'react-collapse'
import _ from 'underscore'

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
    this.handleClick = this.handleClick.bind(this)
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
      Images.doge

    return image_url
  }

  getCardStyle() {
    return this.props.isActive ?
      'admin-course-request-card active' :
      'admin-course-request-card'
  }

  getRequests() {
    return this.props.courses.map((course) => {
      return (
        <div className='course-name'>
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

  renderFields() {
    return (
      _.pairs(this.state.formFields).map((values) => {
        return <Input style="fill marginBot-xxs message-input" multiline={2} key={values[0]} {...values[1]} />
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
            {this.getRequests()}
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
              <button className='course-request-icon-button approve marginRight-sm'>
                <i className='fa fa-check' aria-hidden='true'></i>
              </button>
              <button className='course-request-icon-button reject'>
                <i className='fa fa-times' aria-hidden='true'></i>
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
    name: PropTypes.string.isRequired,
  })),
  setActive: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
}

export default AdminCourseRequestCard

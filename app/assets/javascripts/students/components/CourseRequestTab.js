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
      this.setState({ courses: response.courses })
      console.log(response.courses)
    }, (error) => {
      console.log(error)
    })
  }

  generateRequests(event, onSuccess, onFailure) {
    event.preventDefault()
    const path = APIRoutes.courseRequestPath()
    var inputs = getInputToParams(this.state.formFields)
    var params = {
      request_args: {
        course_ids: JSON.stringify(this.state.formFields.course_ids.value)
      },
    }
    request.post(path, params, (response) => {
      onSuccess && onSuccess()
    }, (error) => {
      console.log(error)
      onFailure && onFailure()
    })
  }

  renderFields() {
    return (
      _.pairs(this.state.formFields).map((values) => {
        return <Input key={values[0]} {...values[1]} />
      })
    )
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
        <Form
          className='submit_request_ids_form'
          id='submit_request_ids_form'
          method='post'
          action={this.props.action}
        >
          {this.renderFields()}
          <SaveButton
            text='Submit Requests'
            onPress={this.generateRequests}
          />
        </Form>
      </div>
    )
  }

}

export default CourseRequestTab

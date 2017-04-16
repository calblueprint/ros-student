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
      formFields: this.getFormFields(),
      requests: [],
    }

    this.generateUpdate = _.bind(this.generateUpdate, this)
  }

  getFormFields() {
    return {
      request_id: {
        label: 'Request ID',
        value: '',
        name: 'Request Ids',
        onChange: _.bind(this.handleChange, this, 'request_id')
      },
      state: {
        label: 'State',
        value: '',
        name: 'State',
        onChange: _.bind(this.handleChange, this, 'state')
      }
    }
  }

  componentDidMount() {
    this.getRequests()
  }

  handleChange(attr, e) {
    const formFields = this.state.formFields
    formFields[attr].value = e.target.value
    this.setState({ formFields: formFields })
  }

  getRequests() {
    const path = APIRoutes.getRequestsPath()

    request.get(path, (response) => {
      this.setState({ requests: response.requests })
      console.log(response.requests)
    }, (error) => {
      console.log(error)
    })
  }

  generateUpdate(event, onSuccess, onFailure) {
    event.preventDefault()
    var inputs = getInputToParams(this.state.formFields)
    const path = APIRoutes.requestUpdatePath(inputs.request_id)
    var params = {
      update_params: {
        state: inputs.state,
      },
    }
    console.log(params)
    request.update(path, params, (response) => {
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

  renderRequests() {
    return this.state.requests.map((value) => {
      return (
        <AdminCourseRequestCard
          student={value.student}
          courses={value.courses}
        />
      )
    })
  }

  render() {
    return (
      <div className='container'>
        {this.renderRequests()}
        <Form
          className='submit_request_update_form'
          id='submit_request_update_form'
          method='post'
          action={this.props.action}
        >
          {this.renderFields()}
          <SaveButton
            text='Submit Approvals'
            onPress={this.generateUpdate}
          />
        </Form>

      </div>
    )
  }
}

export default CourseRequestApprovePage

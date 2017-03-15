import _ from 'underscore'
import React from 'react'
import update from 'immutability-helper'

import { APIRoutes } from '../../shared/routes'
import { getInputToParams, addFlash } from '../../utils/helpers/form_helpers'
import request from '../../shared/requests/request'

import Input from '../../shared/components/forms/Input'
import SaveButton from '../../shared/components/widgets/SaveButton'

class AddCoursesPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      formFields: this.getDefaultFormFields(),
    }

    this.addCourses = this.addCourses.bind(this)
  }

  getDefaultFormFields() {
    return {
      key: {
        label: 'Code',
        value: '',
        onChange: _.bind(this.handleKeyChange, this, 'key'),
        error: '',
      },
    }
  }

  handleKeyChange(attr, e) {
    this.setState({ formFields: update(this.state.formFields, {
      key: {
        value: {
          $set: e.target.value
        }
      },
    })})
  }

  addCourses(e, onSuccess, onFailure) {
    e.preventDefault()

    const path = APIRoutes.addCoursesPath()
    const params = { code: getInputToParams(this.state.formFields) }

    request.post(path, params, (response) => {
      addFlash('success', response.success.message)
      this.setState({ formFields: this.getDefaultFormFields() })
      onSuccess && onSuccess()
    }, (error) => {
      this.setState({ formFields: update(this.state.formFields, {
        key: {
          error: {
            $set: 'is invalid'
          }
        },
      })})

      onFailure && onFailure()
    })
  }

  render() {
    return (
      <div>
        <div>Add Courses</div>
        <p>Please enter the code here to add additional courses to your account.</p>
        <form>
          <Input {...this.state.formFields.key} />
          <SaveButton
            className='marginTop-xs'
            text="Submit"
            onPress={this.addCourses}
            loading='Verifying...'
          />
        </form>

      </div>
    )
  }
}

export default AddCoursesPage

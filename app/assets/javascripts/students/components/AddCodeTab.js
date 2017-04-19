/**
 * Component of `AddCoursesPage` that allows students to add more courses by
 * entering a code supplied by an admin. The student will then be enrolled in
 * the courses included as part of the code that he/she is not already enrolled
 * in.
 */

import React from 'react'
import _ from 'underscore'
import update from 'immutability-helper'

import { APIRoutes } from '../../shared/routes'
import request from '../../shared/requests/request'

import Form from '../../shared/components/forms/Form'
import Input from '../../shared/components/forms/Input'
import SaveButton from '../../shared/components/widgets/SaveButton'
import { getInputToParams, addFlash } from '../../utils/helpers/form_helpers'

class AddCodeTab extends React.Component {
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
      <div className='add-codes-container'>
        <p className='add-codes-description marginBot-md'>Please enter the code you received here to add additional courses to your account. You will be automatically enrolled, and you should see the new courses on your dashboard.</p>
        <form>
          <Input style="add-codes-input marginBot-md" {...this.state.formFields.key} />
          <SaveButton
            className='marginTop-xs'
            text="Submit"
            onPress={this.addCourses}
            loadingText="Verifying..."
          />
        </form>
    </div>
    )
  }
}

export default AddCodeTab

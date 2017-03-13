import _ from 'underscore'
import React from 'react'

import request from '../../shared/requests/request'
import { getUser, setUser } from '../../utils/helpers/user_helpers'
import { getInputToParams, mapErrorToFormFields } from '../../utils/helpers/form_helpers'
import { APIRoutes } from '../../shared/routes'

import UpdateUserModal from '../../shared/components/users/UpdateUserModal'

class UpdateStudentModal extends UpdateUserModal {
  updateUser(e, success, error) {
    e.preventDefault()

    const path = APIRoutes.updateStudentPath(this.props.id)
    const params = {
      student: getInputToParams(this.state.formFields)
    }

    if (!_.isEmpty(this.state.imageField.imageData.value)) {
      params.student.photo_attributes = getInputToParams(this.state.imageField)
    } else {
      params.student.photo_attributes = { remove_image: true }
    }

    request.update(path, params, (response) => {
      setUser(response.student)
      this.user = response.student
      this.setState(this.getUserFields())
      this.props.closeModal()
      success && success()
    }, (error) => {
      this.setState({
        formFields: mapErrorToFormFields(error, this.state.formFields)
      })
      error && error()
    })
  }
}

export default UpdateStudentModal

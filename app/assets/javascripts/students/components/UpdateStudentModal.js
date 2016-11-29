import _ from 'underscore'
import React from 'react'

import request from '../../shared/requests/request'
import { getUser, setUser } from '../../utils/user_helpers'
import { getInputToParams, mapErrorToFormFields } from '../../utils/form_helpers'
import { APIRoutes } from '../../shared/routes'

import UpdateUserModal from '../../shared/components/users/UpdateUserModal'

class UpdateStudentModal extends UpdateUserModal {
  updateUser(e) {
    e.preventDefault()

    const path = APIRoutes.updateStudentPath(this.props.id)
    const params = {
      student: getInputToParams(this.state.formFields)
    }

    if (!_.isEmpty(this.state.imageField.imageData.value)) {
      params.student.photo_attributes = getInputToParams(this.state.imageField)
    }

    request.update(path, params, (response) => {
      setUser(response.student)
      this.user = response.student
      this.setState(this.getUserFields())
      this.props.closeModal()
    }, (error) => {
      this.setState({
        formFields: mapErrorToFormFields(error, this.state.formFields)
      })
    })
  }
}

export default UpdateStudentModal

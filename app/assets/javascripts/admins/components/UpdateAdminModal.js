import _ from 'underscore'
import React from 'react'

import request from '../../shared/requests/request'
import { getUser, setUser } from '../../utils/user_helpers'
import { getInputToParams, mapErrorToFormFields } from '../../utils/form_helpers'
import { APIRoutes } from '../../shared/routes'

import UpdateUserModal from '../../shared/components/users/UpdateUserModal'

class UpdateAdminModal extends UpdateUserModal {
  updateUser(e, success, error) {
    e.preventDefault()

    const path = APIRoutes.updateAdminPath(this.props.id)
    const params = {
      admin: getInputToParams(this.state.formFields)
    }

    if (!_.isEmpty(this.state.imageField.imageData.value)) {
      params.admin.photo_attributes = getInputToParams(this.state.imageField)
    } else {
      params.admin.photo_attributes = { remove_image: true }
    }

    request.update(path, params, (response) => {
      setUser(response.admin)
      this.user = response.admin
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

export default UpdateAdminModal

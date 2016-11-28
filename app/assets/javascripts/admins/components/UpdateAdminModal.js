import _ from 'underscore'
import React from 'react'

import request from '../../shared/requests/request'
import { getUser, setUser } from '../../utils/user_helpers'
import { getInputToParams, mapErrorToFormFields } from '../../utils/form_helpers'
import { APIRoutes } from '../../shared/routes'

import UpdateUserModal from '../../shared/components/users/UpdateUserModal'

class UpdateAdminModal extends UpdateUserModal {
  updateUser(e) {
    e.preventDefault()

    const path = APIRoutes.updateAdminPath(this.props.id)
    const params = {
      admin: getInputToParams(this.state.formFields)
    }

    if (!_.isEmpty(this.state.imageField.imageData.value)) {
      params.admin.photo_attributes = getInputToParams(this.state.imageField)
    }

    request.update(path, params, (response) => {
      setUser(response.admin)
      this.user = response.admin
      this.setState(this.getUserFields())
      this.props.closeModal()
    }, (error) => {
      this.setState({
        formFields: mapErrorToFormFields(error, this.state.formFields)
      })
    })
  }
}

export default UpdateAdminModal

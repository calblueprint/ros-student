/**
 * Modal on AdminProfile that extends from UpdateUserModal and allows admin to
 * update basic profile information, such as password, email, username, etc.
 *
 * @prop id            - id of current admin to update
 * @prop closeModal    - parent method that tracks closed state of this modal
 */

import _ from 'underscore'
import React from 'react'

import request from '../../shared/requests/request'
import { getUser, setUser } from '../../utils/helpers/user_helpers'
import { getInputToParams, mapErrorToFormFields } from '../../utils/helpers/form_helpers'
import { APIRoutes } from '../../shared/routes'

import UpdateUserModal from '../../shared/components/users/UpdateUserModal'

class UpdateAdminModal extends UpdateUserModal {
  updateUser(e, onSuccess, onFailure) {
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
      onSuccess && onSuccess()
    }, (error) => {
      this.setState({
        formFields: mapErrorToFormFields(error, this.state.formFields)
      })
      onFailure && onFailure()
    })
  }
}

UpdateAdminModal.propTypes = {
  id: PropTypes.number.isRequired,
  closeModal: PropTypes.func.isRequired, 
}

export default UpdateAdminModal

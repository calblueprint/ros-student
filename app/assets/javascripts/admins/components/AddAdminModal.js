import _ from 'underscore'
import React, { PropTypes } from 'react'
import Modal from 'react-bootstrap-modal'

import request from '../../shared/requests/request'
import { APIRoutes } from '../../shared/routes'
import { getInputToParams, mapErrorToFormFields } from '../../utils/helpers/form_helpers'
import { Images } from '../../utils/helpers/image_helpers'

import Form from '../../shared/components/forms/Form'
import Input from '../../shared/components/forms/Input'

class AddAdminModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      formFields: this.getInitialForm()
    }

    this.createAdmin = this.createAdmin.bind(this)
  }

  getInitialForm() {
    return {
      email: {
        label: 'Email',
        value: '',
        onChange: _.bind(this.handleChange, this, 'email'),
        error: '',
      },
      firstName: {
        label: 'First Name',
        value: '',
        onChange: _.bind(this.handleChange, this, 'firstName'),
        error: '',
      },
      lastName: {
        label: 'Last Name',
        value: '',
        onChange: _.bind(this.handleChange, this, 'lastName')
      }
    }
  }

  createAdmin(e) {
    e.preventDefault()
    const params = {
      admin: getInputToParams(this.state.formFields)
    }
    const path = APIRoutes.createAdminPath()

    request.post(path, params, (response) => {
      this.setState({ formFields: this.getInitialForm() })
      this.props.closeModal()
      console.log(response.admin)
      this.props.setNewUser(response.admin)
    }, (error) => {
      console.log(error)
      this.setState({
        formFields: mapErrorToFormFields(error, this.state.formFields)
      })
    })
  }

  handleChange(attr, e) {
    const formFields = this.state.formFields
    formFields[attr].value = e.target.value
    this.setState({ formFields: formFields })
  }

  getDismissStyle() {
    return {
      backgroundImage: `url(${Images.close_modal})`,
    }
  }

  render() {
    return (
      <Modal
        show={this.props.isModalOpen}
        onHide={this.props.closeModal}
      >
        <Modal.Header>
          <Modal.Title>Create Admin</Modal.Title>
          <Modal.Dismiss
            className='flex center modal-dismiss-container'
            onClick={this.props.closeModal}>
            <div style={this.getDismissStyle()} className='modal-dismiss'/>
          </Modal.Dismiss>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className='flex flex-vertical'>
              <Input {...this.state.formFields.email} />
              <Input {...this.state.formFields.firstName} />
              <Input {...this.state.formFields.lastName} />
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <input
            type='submit'
            className='button marginTop-xs'
            value='Create admin'
            onClick={this.createAdmin}
          />
        </Modal.Footer>
      </Modal>
    )
  }
}

AddAdminModal.propTypes = {
  setNewUser: PropTypes.func.isRequired
}

export default AddAdminModal

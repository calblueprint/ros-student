import _ from 'underscore'
import React from 'react'
import Modal from 'react-bootstrap-modal'

import request from '../../shared/requests/request'
import { APIRoutes } from '../../shared/routes'
import { getInputToParams, mapErrorToFormFields } from '../../utils/form_helpers'

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
      this.setState({ formFields: this.getInitialForm })
      this.props.closeModal()
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

  render() {
    return (
      <Modal
        show={this.props.isModalOpen}
        onHide={this.props.closeModal}
      >
        <Modal.Header>
          <Modal.Title>Create Admin</Modal.Title>
          <Modal.Dismiss className='modal-dismiss' onClick={this.props.closeModal}/>
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

export default AddAdminModal

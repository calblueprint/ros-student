import _ from 'underscore'
import React from 'react'
import Modal from 'react-bootstrap-modal'

import request from '../../shared/requests/request'

import { getUser, setUser } from '../../utils/user_helpers'
import { getInputToParams, mapErrorToFormFields } from '../../utils/form_helpers'
import { APIRoutes } from '../../shared/routes'

import Form from '../../shared/components/forms/Form'
import Input from '../../shared/components/forms/Input'
import ImageUploadInput from '../../shared/components/forms/ImageUploadInput'

class UpdateStudentPage extends React.Component {
  constructor(props) {
    super(props)

    this.id = this.props.routeParams.id
    // Assume we're modifying only our user
    this.user = getUser()
    this.state = _.extend(this.getUserFields(), {
      previousImage: '',
      isModalOpen: false,
    })

    this.updateUser = this.updateUser.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  getUserFields() {
    return {
      formFields: {
        image: {
          label: 'Profile Image',
          value: '',
          imageUrl: this.user.
          onChange: _.bind(this.handleImage, this),
        },
        email: {
          label: 'Email',
          value: this.user.email,
          onChange: _.bind(this.handleChange, this, 'email'),
          error: '',
        },
        username: {
          label: 'Username',
          value: this.user.username,
          onChange: _.bind(this.handleChange, this, 'username'),
          error: '',
        },
        firstName: {
          label: 'First Name',
          value: this.user.first_name,
          onChange: _.bind(this.handleChange, this, 'firstName'),
          error: '',
        },
        lastName: {
          label: 'Last Name',
          value: this.user.last_name,
          onChange: _.bind(this.handleChange, this, 'lastName'),
          error: '',
        },
        newPassword: {
          label: 'New Password',
          value: '',
          type: 'password',
          onChange: _.bind(this.handleChange, this, 'newPassword'),
          error: '',
        },
        confirmPassword: {
          label: 'Confirm Password',
          value: '',
          type: 'password',
          onChange: _.bind(this.handleChange, this, 'confirmPassword'),
          error: '',
        },
        currentPassword: {
          label: 'Current Password',
          value: '',
          type: 'password',
          onChange: _.bind(this.handleChange, this, 'currentPassword'),
          error: '',
        },
      }
    }
  }

  updateUser(e) {
    e.preventDefault()

    const path = APIRoutes.updateStudentPath(this.id)
    const params = { student: getInputToParams(this.state.formFields) }

    request.update(path, params, (response) => {
      setUser(response.student)
      this.user = response.student
      this.setState(this.getUserFields())
    }, (error) => {
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

  handleImage(e) {
  }

  openModal() {
    this.setState({ isModalOpen: true })
  }

  closeModal() {
    this.setState({ isModalOpen: false })
  }

  render() {
    return (
      <div>
        <h1>Update Profile</h1>
        <button onClick={this.openModal}>Edit Profile</button>
        <Modal
          show={this.state.isModalOpen}
          onHide={this.closeModal}
        >
          <Modal.Header>
            <Modal.Title className='update-user-header'>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form fields={this.state.formFields}>
              <div className='flex flex-horizontal update-user-container'>
                <div className='flex center update-user-column update-user-input'>
                  <ImageUploadInput {...this.state.formFields.image} />
                </div>

                <div className='update-user-column'>
                  <div className='flex flex-horizontal update-user-container'>
                    <div className='update-user-column update-user-input'>
                      <Input {...this.state.formFields.firstName} />
                    </div>

                    <div className='update-user-column update-user-input'>
                      <Input {...this.state.formFields.lastName} />
                    </div>
                  </div>
                  <div className='update-user-input'>
                    <Input {...this.state.formFields.email} />
                  </div>
                  <div className='update-user-input'>
                    <Input {...this.state.formFields.username} />
                  </div>
                  <div className='update-user-input'>
                    <Input {...this.state.formFields.newPassword} />
                  </div>
                  <div className='update-user-input'>
                    <Input {...this.state.formFields.confirmPassword} />
                  </div>
                  <div className='update-user-input'>
                    <Input {...this.state.formFields.currentPassword} />
                  </div>
                </div>
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <div className='flex flex-horizontal update-user-container'>
              <div className='update-user-column update-user-input'>
                <input
                  type='submit'
                  className='button button--red marginTop-xs update-user-button'
                  value='Cancel'
                  onClick={this.closeModal}
                />
              </div>

              <div className='update-user-column update-user-input'>
                <input
                  type='submit'
                  className='button marginTop-xs update-user-button'
                  value='Update user'
                  onClick={this.updateUser}
                />
              </div>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default UpdateStudentPage

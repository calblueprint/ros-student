import _ from 'underscore'
import React from 'react'
import Modal from 'react-bootstrap-modal'

import request from '../../requests/request'

import { getUser, setUser } from '../../../utils/user_helpers'
import { Images, convertImage } from '../../../utils/image_helpers'

import Form from '../forms/Form'
import Input from '../forms/Input'
import ImageUploadInput from '../forms/ImageUploadInput'

class UpdateUserModal extends React.Component {
  constructor(props) {
    super(props)

    // Assume we're modifying only our user
    this.user = getUser()
    this.state = _.extend(this.getUserFields(), {
      previousImage: '',
      isModalOpen: false,
    })

    this.updateUser = this.updateUser.bind(this)
    this.handleImage = this.handleImage.bind(this)
    this.removeImage = this.removeImage.bind(this)
    this.setImage = this.setImage.bind(this)
  }

  getUserFields() {
    return {
      formFields: {
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
      },
      imageField: {
        imageData: {
          label: 'Profile Image',
          value: '',
          imageUrl: this.user.image_url,
          onChange: _.bind(this.handleImage, this),
        },
      }
    }
  }

  setImage(image) {
    const imageField = this.state.imageField
    imageField.imageData.value = image
    imageField.imageData.imageUrl = image
    this.setState({ imageField: imageField })
  }

  removeImage(e) {
    e.preventDefault()
    this.setImage('')
  }

  handleChange(attr, e) {
    const formFields = this.state.formFields
    formFields[attr].value = e.target.value
    this.setState({ formFields: formFields })
  }

  handleImage(e) {
    convertImage(e, this.setImage)
  }

  renderImage() {
    const imageState = this.state.imageField.imageData
    return imageState.value || imageState.imageUrl || Images.default_profile
  }

  render() {
    return (
      <div>
        <Modal
          show={this.props.openEditModal}
          onHide={this.props.closeModal}
        >
          <Modal.Header>
            <Modal.Title
              className='update-user-header'>
              Edit Profile
            </Modal.Title>
            <Modal.Dismiss
              className='flex center modal-dismiss-container'
              onClick={this.closeModal}>
              <img
                src={Images.close_modal}
                className='modal-dismiss'/>
            </Modal.Dismiss>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div className='flex flex-horizontal update-user-container'>
                <div className='update-user-column update-user-input'>
                  <div className='flex center update-user-image-flex'>
                    <div className='update-user-image-container'>
                      <img
                        className='update-user-image'
                        src={this.renderImage()} />
                      <div className='update-user-image-upload'>
                        <button
                          className='button button--red update-user-image-button margin'
                          onClick={this.removeImage}>
                          Remove Image
                        </button>
                        <label
                          htmlFor='update-user-image-upload'
                          className='button update-user-image-button'
                          onChange={this.handleImage}>
                          Upload Image
                        </label>
                        <input
                          id='update-user-image-upload'
                          className='hidden-input'
                          type='file'
                          onChange={this.handleImage}
                          accept='image/jpg, image/jpeg, image/png'
                        />
                      </div>
                    </div>
                  </div>
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
                  onClick={this.props.closeModal}
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

export default UpdateUserModal

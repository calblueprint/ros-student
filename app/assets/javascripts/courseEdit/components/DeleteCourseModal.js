import _ from 'underscore'
import React, { PropTypes } from 'react'
import Modal from 'react-bootstrap-modal'

import Input from '../../shared/components/forms/Input'

class DeleteCourseModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      formFields: {
        name: {
          label: 'Course Name',
          value: '',
          onChange: _.bind(this.handleChange, this, 'name'),
          error: '',
        },
      },
    }

    this.onDeleteSubmit = this.onDeleteSubmit.bind(this)
  }

  handleChange(attr, e) {
    const formFields = this.state.formFields
    formFields[attr].value = e.target.value
    this.setState({ formFields: formFields })
  }

  onDeleteSubmit() {
    if (this.state.formFields.name.value !== this.props.name) {
      const formFields = this.state.formFields
      formFields.name.error = 'Invalid course name'
      this.setState({ formFields: formFields })
      return
    }

    this.props.onDelete()
  }

  render() {
    const confirmDelete = `Are you sure you want to delete this course? You can't undo this action. To confirm, please type in the name of the course: ${this.props.name}`
    return (
      <Modal
        show={this.props.openDeleteModal}
        onHide={this.props.closeModal}
      >
        <Modal.Header>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>{confirmDelete}</div>
          <Input {...this.state.formFields.name} />
        </Modal.Body>
        <Modal.Footer>
          <div className='flex flex-horizontal delete-modal-container'>
            <div className='delete-modal-column delete-modal-input'>
              <input
                type='submit'
                className='button button--red marginTop-xs delete-modal-button'
                value='Cancel'
                onClick={this.props.closeModal}
              />
            </div>

            <div className='delete-modal-column delete-modal-input'>
              <input
                type='submit'
                className='button marginTop-xs delete-modal-button'
                value='Delete'
                onClick={this.onDeleteSubmit}
              />
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    )
  }
}

DeleteCourseModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  openDeleteModal: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default DeleteCourseModal

import _ from 'underscore'
import React, { PropTypes } from 'react'
import Modal from 'react-bootstrap-modal'

class DeleteModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isModalOpen: false,
    }
  }

  renderDelete() {
    const confirmDeleteMessage = `Are you sure you want to delete this ${this.props.objectType}? This action cannot be undone.`

    return (
      <div>
        <Modal.Body>
          {confirmDeleteMessage}
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
                onClick={this.props.deleteFunction}
              />
            </div>
          </div>
        </Modal.Footer>
      </div>
    )
  }

  renderDisabled() {
    return (
      <div>
        <Modal.Body>
          This course has already been published - deleting is now disabled so that those already taking the course won't be affected. If you'd like to make changes, unpublish the course first.
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </div>
    )
  }

  render() {
    return (
      <Modal
        show={this.props.openDeleteModal}
        onHide={this.props.closeModal}
      >
        <Modal.Header>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>

        {this.props.disabled ? this.renderDisabled() : this.renderDelete()}
      </Modal>
    )
  }
}

DeleteModal.propTypes = {
  openDeleteModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  deleteFunction: PropTypes.func.isRequired,
  objectType: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
}

export default DeleteModal

/**
 * Simple modal with header and dismiss built-in
 *
 * @prop title        - string for title in modal header
 * @prop isModalOpen  - boolean indicating whether modal is being displayed
 * @prop closeModal   - callback to be invoked when modal is dismissed
 *                      (usually will setState `isModalOpen` in the parent
 *                      to `false`)
 */
import _ from 'underscore'
import React, { PropTypes } from 'react'
import Modal from 'react-bootstrap-modal'

import { Images } from '../../../utils/helpers/image_helpers'

class SimpleModal extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    /**
     * If you need to render in the footer, use this instead of Modal.Footer:
     *   <div className='modal-footer'>content</div>
     */
    return (
      <Modal
        show={this.props.isModalOpen}
        onHide={this.props.closeModal}
      >
        <Modal.Header>
          <Modal.Title>{this.props.title}</Modal.Title>
          <Modal.Dismiss
            className='flex center modal-dismiss-container'
            onClick={this.closeModal}
          >
            <img
              src={Images.close_modal}
              className='modal-dismiss'
            />
          </Modal.Dismiss>
        </Modal.Header>
        <Modal.Body>
          {this.props.children}
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    )
  }
}

SimpleModal.propTypes = {
  title: PropTypes.string.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default SimpleModal

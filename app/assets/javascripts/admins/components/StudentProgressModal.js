import _ from 'underscore'
import React from 'react'
import Modal from 'react-bootstrap-modal'

import { Images } from '../../utils/image_helpers'
import { APIRoutes } from '../../shared/routes'

class StudentProgressModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  componentDidUpdate() {
    console.log(this.props.user)
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
          <Modal.Title>The</Modal.Title>
          <Modal.Dismiss
            className='flex center modal-dismiss-container'
            onClick={this.props.closeModal}>
            <div style={this.getDismissStyle()} className='modal-dismiss'/>
          </Modal.Dismiss>
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>
    )
  }
}

export default StudentProgressModal

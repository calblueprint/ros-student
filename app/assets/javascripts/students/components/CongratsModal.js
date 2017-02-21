import React from 'react'
import Modal from 'react-bootstrap-modal'
import { RailsRoutes } from '../../shared/routes'
import { Images, convertImage } from '../../utils/image_helpers'

class CongratsModal extends React.Component {
  render() {
    return(
      <div>
        <Modal
          show={this.props.openModal}
          onHide={this.props.closeModal}
        >
          <Modal.Header>
            <Modal.Title
              className='congrats-header'>
              Congratulations!
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
            <div>
              Well done! You have successfully completed this Module!
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className='flex flex-horizontal update-user-container'>
              <div className='update-user-column update-user-input'>
                <a href={ RailsRoutes.dashboardPath() }>To Courses</a>
              </div>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default CongratsModal


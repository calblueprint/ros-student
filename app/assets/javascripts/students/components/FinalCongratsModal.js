import React from 'react'
import Modal from 'react-bootstrap-modal'
import { RailsRoutes } from '../../shared/routes'
import { Images, convertImage } from '../../utils/image_helpers'

class FinalCongratsModal extends React.Component {
  render() {
    return(
      <div>
        <Modal
          show={this.props.isModalOpen}
          onHide={this.props.closeModal}
        >
          <Modal.Header>
            <Modal.Title
              className='congrats-header'>
              Congratulations!
            </Modal.Title>
            <Modal.Dismiss
              className='flex center modal-dismiss-container'
              onClick={this.props.closeModal}>
              <img
                src={Images.close_modal}
                className='modal-dismiss'/>
            </Modal.Dismiss>
          </Modal.Header>
          <Modal.Body>
            <div>
              Wow! You finished this course! 
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

export default FinalCongratsModal


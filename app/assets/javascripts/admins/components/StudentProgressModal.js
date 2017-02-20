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

  getDismissStyle() {
    return {
      backgroundImage: `url(${Images.close_modal})`,
    }
  }

  getStudentCourses(student) {
    return student.courses.map((course) => {
      return (
        <li>
          {course.name}
        </li>
      )
    })
  }

  render() {
    return (
      <Modal
        show={this.props.isModalOpen}
        onHide={this.props.closeModal}
      >
        { this.props.student ?
          <div>
            <Modal.Header>
              <Modal.Title>{this.props.student.username}</Modal.Title>
              <Modal.Dismiss
                className='flex center modal-dismiss-container'
                onClick={this.props.closeModal}>
                <div style={this.getDismissStyle()} className='modal-dismiss'/>
              </Modal.Dismiss>
            </Modal.Header>
            <Modal.Body>
              <p>{this.props.student.first_name} {this.props.student.last_name}</p>
              <p>
                {this.props.student.email}

              </p>
            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
          </div>
          : null
        }
      </Modal>
    )
  }
}

export default StudentProgressModal

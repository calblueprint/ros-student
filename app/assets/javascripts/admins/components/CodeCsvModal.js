/**
 * Basic modal on CodeCsvListPage that shows when admin presses on a code_csv
 * to expand its details. Takes the corresponding code_csv and returns the list
 * of courses to which it corresponds.
 *
 * @prop codeCsv          - code_csv object that the admin selected to expand
 * @prop isModalOpen      - bool indicating whether this modal is opened
 * @prop closeModal       - parent method that sets the closed state of this modal
 */

import React, { PropTypes } from 'react'
import Modal from 'react-bootstrap-modal'
import { Images } from '../../utils/helpers/image_helpers'
import { APIRoutes } from '../../shared/routes'
import request from '../../shared/requests/request'

class CodeCsvModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      courses: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isModalOpen && nextProps.isModalOpen) {
      const path = APIRoutes.getCodeCsvPath(this.props.codeCsv.id)
      request.get(path, (response) => {
        this.setState({ courses: response.code_csv.courses })
      }, (error) => {
        console.log(error)
      })
    }
  }

  renderCourses() {
    return this.state.courses.map((value) => {
      return (
        <div className='courses' key={value.id}>
          <h3>{value.name}</h3>
        </div>
      )
    })
  }

  render() {
    return (
      <Modal
        show={this.props.isModalOpen}
        onHide={this.props.closeModal}
      >
        <Modal.Header>
          <Modal.Title
            className='code-csv-modal-title'>
            {this.props.codeCsv.name}
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
          <h2 className='input-label'>Courses Selected</h2>
          {this.renderCourses()}
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    )
  }
}

CodeCsvModal.propTypes = {
  codeCsv: PropTypes.object.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default CodeCsvModal

import React, { PropTypes } from 'react'
import Modal from 'react-bootstrap-modal'
import { Images } from '../../utils/image_helpers'
import { APIRoutes } from '../../shared/routes'
import request from '../../shared/requests/request'

class CodeCsvModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      courses: [],
    }
  }

  componentDidMount() {
    const path = APIRoutes.getCodeCsvPath(this.props.codeCsv.id)
    request.get(path, (response) => {
      this.setState({ courses: response.code_csv.courses })
    }, (error) => {
      console.log(error)
    })
  }

  renderCourses() {
    console.log(this.state.courses)
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

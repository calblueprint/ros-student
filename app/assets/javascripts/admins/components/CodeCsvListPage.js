import _ from 'underscore'
import React from 'react'
import Modal from 'react-bootstrap-modal'

import request from '../../shared/requests/request'

import { getUser, setUser } from '../../utils/user_helpers'
import { getInputToParams } from '../../utils/form_helpers'
import { APIRoutes } from '../../shared/routes'

import CodeCsvCard from './CodeCsvCard.js'
import GenerateCodeCsvModal from './GenerateCodeCsvModal.js'

class CodeCsvListPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      code_csvs: [],
      isModalOpen: false
    }
    this.getCodeCsvs()
    this.updateCodeCsvs = this.updateCodeCsvs.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  getCodeCsvs() {
    const path = APIRoutes.codeCsvListPath()

    request.get(path, (response) => {
      this.setState({ code_csvs: response.code_csvs })
    }, (error) => {
      console.log('error')
    })
  }

  updateCodeCsvs(code_csv) {
    var new_code_csvs = this.state.code_csvs
    new_code_csvs.push(code_csv)
    this.setState({ code_csvs: new_code_csvs })
  }

  openModal() {
    this.setState({ isModalOpen: true })
  }

  closeModal() {
    this.setState({ isModalOpen: false })
  }

  renderCodeCsvBlank() {
    return (
      <li>
        <div className="flex flex-horizontal code-csv-card empty" onClick={this.openModal}>
          <h3 className="code-csv-name">Generate new codes</h3>
        </div>
      </li>
    )
  }

  renderCodeCsvs() {
    return this.state.code_csvs.map((codeCsv) => {
      return (
        <li key={codeCsv.id}  >
          <CodeCsvCard code_csv={codeCsv} />
        </li>
      )
    })
  }

  render() {
    return (
      <div className='flex center'>
        <div className='container code-csv-container'>

          <Modal
            show={this.state.isModalOpen}
            onHide={this.closeModal}
          >
            <Modal.Header>
              <Modal.Title>Generate New Codes</Modal.Title>
              <Modal.Dismiss className='modal-dismiss' onClick={this.closeModal}/>
            </Modal.Header>
            <Modal.Body>
              <GenerateCodeCsvModal update={this.updateCodeCsvs} closeModal={this.closeModal}/>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
          </Modal>

          <h2 className='h2'>List of codes</h2>
          <ul>
            {this.renderCodeCsvBlank()}
            {this.renderCodeCsvs()}
          </ul>
        </div>
      </div>
    )
  }
}

export default CodeCsvListPage

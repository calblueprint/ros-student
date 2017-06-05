/**
 * Main page that is displayed on the admin-side code generating functionality.
 * Shows an alphabetically sorted list of code_csv's, which can each be expanded
 * and downloaded. There is also a button at the top, which enables admins to
 * generate a new code_csv.
 */

import _ from 'underscore'
import React from 'react'
import Modal from 'react-bootstrap-modal'

import request from '../../shared/requests/request'

import { getUser, setUser } from '../../utils/helpers/user_helpers'
import { Images } from '../../utils/helpers/image_helpers'
import { getInputToParams } from '../../utils/helpers/form_helpers'
import { APIRoutes } from '../../shared/routes'

import CodeCsvCard from './CodeCsvCard.js'
import GenerateCodeCsvModal from './GenerateCodeCsvModal.js'

class CodeCsvListPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      code_csvs: [],
      isModalOpen: false,
    }
    this._mounted = false
    this.updateCodeCsvs = this.updateCodeCsvs.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  componentDidMount() {
    this._mounted = true
    this.getCodeCsvs()
  }

  componentWillUnmount() {
    this._mounted = false
  }

  getCodeCsvs() {
    const path = APIRoutes.codeCsvListPath()

    request.get(path, (response) => {
      this._mounted && this.setState({ code_csvs: response.code_csvs })
    }, (error) => {
      console.log(error)
    })
  }

  updateCodeCsvs(code_csv) {
    var new_code_csvs = this.state.code_csvs
    new_code_csvs.push(code_csv)
    new_code_csvs.sort((a, b) => {
      return (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1
    })
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
        <div
          className="flex flex-horizontal code-csv-card empty" onClick={this.openModal}
        >
          <h3 className="code-csv-name">Generate new codes</h3>
        </div>
      </li>
    )
  }

  renderCodeCsvs() {
    return this.state.code_csvs.map((codeCsv) => {
      return (
        <li key={codeCsv.id}>
          <CodeCsvCard code_csv={codeCsv} />
        </li>
      )
    })
  }

  render() {
    return (
      <div className='flex center'>
        <div className='container marginTop-xxl'>
          <GenerateCodeCsvModal
            isModalOpen={this.state.isModalOpen}
            closeModal={this.closeModal}
            update={this.updateCodeCsvs}
          />

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

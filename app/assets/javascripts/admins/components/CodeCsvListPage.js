import _ from 'underscore'
import React from 'react'

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
      code_csvs: []
    }
    this.getCodeCsvs()
    this.updateCodeCsvs = this.updateCodeCsvs.bind(this)
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

  showCodeCsvGenerateModal(e) {
    e.preventDefault()
  }

  renderCodeCsvs() {
    var cc = this.state.code_csvs
    return Array.from({length: cc.length}, (v, k) => k).map((index) => {
      return (
        <li>
          <CodeCsvCard code_csv={cc[cc.length-index-1]} />
        </li>
      )
    })
  }

  render() {
    // <button onClick={this.showCodeCsvGenerateModal}> Generate new codes </button>
    // NOTE: Add button later when modal is ready
    return (
      <div>
        <GenerateCodeCsvModal update={this.updateCodeCsvs}/>
        <h1>List of Codes</h1>
        <ul>{this.renderCodeCsvs()}</ul>
      </div>
    )
  }
}

export default CodeCsvListPage

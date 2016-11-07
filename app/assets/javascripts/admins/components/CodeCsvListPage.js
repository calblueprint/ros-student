import _ from 'underscore'
import React from 'react'

import request from '../../shared/requests/request'

import { getUser, setUser } from '../../utils/user_helpers'
import { getInputToParams } from '../../utils/form_helpers'
import { APIRoutes } from '../../shared/routes'

import CodeCsvCard from './CodeCsvCard.js'

class CodeCsvListPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      code_csvs: []
    }
    this.getCodeCsvs()
  }

  getCodeCsvs() {
    const path = APIRoutes.codeCsvListPath()

    request.get(path, (response) => {
      this.setState({ code_csvs: response.code_csvs })
    }, (error) => {
      console.log('error')
    })
  }

  showCodeCsvGenerateModal(e) {
    e.preventDefault()
  }

  //done
  renderCodeCsvs() {
    return this.state.code_csvs.map((value) => {
      return (
        <li>
          <CodeCsvCard code_csv={value}/>
        </li>
      )
    })
  }

  //done
  render() {
    return (
      <div>
        <button onClick={this.showCodeCsvGenerateModal}> Generate new codes </button>
        <ul>{this.renderCodeCsvs()}</ul>
      </div>
    )
  }
}

export default CodeCsvListPage

import React from 'react'
import request from '../../shared/requests/request'
import { APIRoutes } from '../../shared/routes'

import CodeCsvModal from './CodeCsvModal'

class CodeCsvCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalOpen: false,
    }
    this.downloadCodeCsv = this.downloadCodeCsv.bind(this)
    this.openCsvModal = this.openCsvModal.bind(this)
    this.closeCsvModal = this.closeCsvModal.bind(this)
  }

  downloadCodeCsv(e) {
    e.stopPropagation()
    e.preventDefault()
    const path = APIRoutes.codeCsvDownloadPath(this.props.code_csv.id)

    request.csv(path, (response) => {
    }, (error) => {
      console.log('error')
    })
  }

  openCsvModal() {
    this.setState({ isModalOpen: true })
  }

  closeCsvModal() {
    this.setState({ isModalOpen: false })
  }

  render() {
    var created_at = new Date(this.props.code_csv.created_at)
    created_at = created_at.toUTCString()
    return (
      <div className='flex code-csv-card' onClick={this.openCsvModal}>
        <div className='flex name-date-wrapper'>
          <div className='code-csv-name'>
            {this.props.code_csv.name}
          </div>
          <div className='code-csv-date'>
            {created_at}
          </div>
        </div>
        <div className='code-csv-download'>
          <button className='button' onClick={this.downloadCodeCsv}>Download</button>
        </div>
        <CodeCsvModal
          isModalOpen={this.state.isModalOpen}
          closeModal={this.closeCsvModal}
          codeCsv={this.props.code_csv}
        />
      </div>
    )
  }
}

export default CodeCsvCard

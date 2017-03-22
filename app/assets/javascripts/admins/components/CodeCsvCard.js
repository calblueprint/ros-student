/**
 * Card for displaying groups of generated codes and allowing download
 *
 * @prop code_csv  - code_csv object with id, name, and created_at
 */
 
import React, { PropTypes } from 'react'
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

  getDateCreated() {
    return (new Date(this.props.code_csv.created_at)).toUTCString()
  }

  render() {
    return (
      <div className='flex code-csv-card' onClick={this.openCsvModal}>
        <div className='flex name-date-wrapper'>
          <div className='code-csv-name'>
            {this.props.code_csv.name}
          </div>
          <div className='code-csv-date'>
            {this.getDateCreated()}
          </div>
        </div>
        <div className='code-csv-download'>
          <button
            className='button'
            onClick={this.downloadCodeCsv}
          >
            Download
          </button>
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

CodeCsvCard.propTypes = {
  code_csv: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
  })
}

export default CodeCsvCard

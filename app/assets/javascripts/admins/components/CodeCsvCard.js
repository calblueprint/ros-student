import React from 'react'
import request from '../../shared/requests/request'
import { APIRoutes } from '../../shared/routes'

class CodeCsvCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.downloadCodeCsv = this.downloadCodeCsv.bind(this)
  }

  downloadCodeCsv(e) {
    e.preventDefault()
    const path = APIRoutes.codeCsvDownloadPath(this.props.code_csv.id)

    request.csv(path, (response) => {
    }, (error) => {
      console.log('error')
    })
  }

  floatLeftStyle() {
    return {
      float: 'left'
    }
  }

  floatRightStyle() {
    return {
      float: 'right'
    }
  }

  render() {
    return (
      <div className='flex flex-horizontal code-csv-container'>
        <div className='code-csv-name'>
          <h3>{this.props.code_csv.name}</h3>
        </div>
        <div className='code-csv-download'>
          <button className='button' onClick={this.downloadCodeCsv}>Download</button>
        </div>
      </div>
    )
  }
}

export default CodeCsvCard

import React from 'react'

import { APIRoutes } from '../../shared/routes'
import { readJSONFile } from '../../utils/file_helpers'
import request from '../../shared/requests/request'

import Form from '../../shared/components/forms/Form'

class ExportImportPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fileName: 'Import Course',
      file: '',
    }

    this.handleFile = this.handleFile.bind(this)
    this.importCourse = this.importCourse.bind(this)
    this.setFile = this.setFile.bind(this)
    this.exportCourse = this.exportCourse.bind(this)
  }

  exportCourse(e) {
    e.preventDefault()
    const route = APIRoutes.exportCoursePath(1)
    request.json(route, (response) => {
      console.log(response)
    }, (error) => {
      console.log(error)
    })
  }

  importCourse(e) {
    e.preventDefault()

    const route = APIRoutes.importCoursePath()
    const params = {
      course: {
        file: this.state.file,
      }
    }

    request.post(route, params, (response) => {
      console.log(response)
    }, (error) => {
      console.log(error)
    })
  }

  setFile(result) {
    this.setState({ file: result })
    // this.setState({ file: JSON.stringify(JSON.parse(result)) })
  }

  handleFile(e) {
    readJSONFile(e, this.setFile)

    const files = e.target.files
    console.log(files)
    if (files && files[0]) {
      this.setState({ fileName: files[0].name })
    }
  }

  render() {
    return (
      <div>
        <Form>
          <label
            htmlFor='course-import'
            className='button'
            onChange={this.handleFile}>
            {this.state.fileName}
          </label>
          <input
            id='course-import'
            className='hidden-input'
            type='file'
            onChange={this.handleFile}
            accept='.json'
          />
          <input
            type='submit'
            className='button marginTop-xs'
            value='Submit'
            onClick={this.importCourse}
          />
        </Form>

        <Form>
          <input
            type='submit'
            className='button marginTop-xs'
            value='Submit'
            onClick={this.exportCourse}
          />
        </Form>
      </div>
    )
  }
}

export default ExportImportPage

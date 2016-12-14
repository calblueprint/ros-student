import _ from 'underscore'
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
      courses: [],
      selectedCourse: -1,
    }

    this.handleCourseSelect = this.handleCourseSelect.bind(this)
    this.handleFile = this.handleFile.bind(this)
    this.importCourse = this.importCourse.bind(this)
    this.setFile = this.setFile.bind(this)
    this.exportCourse = this.exportCourse.bind(this)
  }

  componentDidMount() {
    const path = APIRoutes.getAdminCoursesPath()
    request.get(path, (response) => {
      this.setState({ courses: response.courses })
    }, (error) => {
      console.log(error)
    })
  }

  exportCourse(e) {
    e.preventDefault()
    const id = this.state.selectedCourse
    if (id == -1) {
      return
    }

    const route = APIRoutes.exportCoursePath(id)
    const course = this.state.courses.find((course) => course.id == id)
    request.json(route, (response) => {
      console.log(response)
    }, (error) => {
      console.log(error)
    }, `${course.name}.json`)
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
  }

  handleCourseSelect(e) {
    this.setState({ selectedCourse: e.target.value })
  }

  handleFile(e) {
    readJSONFile(e, this.setFile)

    const files = e.target.files
    if (files && files[0]) {
      this.setState({ fileName: files[0].name })
    }
  }

  renderSelectOptions() {
    return this.state.courses.map((course) => {
      return (
        <option key={course.id} value={course.id}>
          {course.name}
        </option>
      )
    })
  }

  render() {
    return (
      <div>
        <h2 className='h2'>Export Course</h2>
        <Form>
          <select
            defaultValue={this.state.selectedCourse}
            onChange={this.handleCourseSelect}>
            <option value={-1}>
              Select a course
            </option>
            {this.renderSelectOptions()}
          </select>
          <input
            type='submit'
            className='button marginTop-xs'
            value='Submit'
            onClick={this.exportCourse}
          />
        </Form>

        <h2 className='h2'>Import Course</h2>
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
      </div>
    )
  }
}

export default ExportImportPage

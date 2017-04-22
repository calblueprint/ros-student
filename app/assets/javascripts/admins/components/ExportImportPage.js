import _ from 'underscore'
import React from 'react'

import { APIRoutes } from '../../shared/routes'
import { readJSONFile } from '../../utils/helpers/file_helpers'
import { Images } from '../../utils/helpers/image_helpers'
import request from '../../shared/requests/request'

import Form from '../../shared/components/forms/Form'
import SaveButton from '../../shared/components/widgets/SaveButton'

class ExportImportPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fileName: 'None',
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

  exportCourse(e, onSuccess, onFailure) {
    e.preventDefault()
    const id = this.state.selectedCourse
    if (id == -1) {
      return
    }

    const route = APIRoutes.exportCoursePath(id)
    const course = this.state.courses.find((course) => course.id == id)
    request.json(route, (response) => {
      onSuccess && onSuccess()
    }, (error) => {
      onFailure && onFailure()
    }, `${course.name}.json`)
  }

  importCourse(e, onSuccess, onFailure) {
    e.preventDefault()
    if (_.isEmpty(this.state.file)) {
      return
    }

    const route = APIRoutes.importCoursePath()
    const params = {
      course: {
        file: this.state.file,
      }
    }

    request.post(route, params, (response) => {
      onSuccess && onSuccess()
    }, (error) => {
      console.log(error)
      onFailure && onFailure()
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

  getDropdownStyle() {
    return {
      backgroundImage: `url(${Images.dropdown_arrow})`,
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
      <div className='container export-import-container'>
        <div className='flex'>
          <div className='export-container'>
            <div className='flex center flex-vertical'>
              <h1 className='h1'>Export Course</h1>
              <p className='marginTopBot-md export-import-desc'>To export a course, select the course that you'd like to export from the dropdown below. This will export all of a course's content in a .json format, which you can edit and re-upload as a new course.</p>
              <Form>
                <select
                  style={this.getDropdownStyle()}
                  className='select course-export-button'
                  defaultValue={this.state.selectedCourse}
                  onChange={this.handleCourseSelect}>
                  <option value={-1}>
                    Select a course
                  </option>
                  {this.renderSelectOptions()}
                </select>
                <SaveButton
                  text="Submit"
                  onPress={this.exportCourse}
                  className={`${this.state.selectedCourse == -1 ? 'disabled' : ''} marginTop-xs`}
                />
              </Form>
            </div>
          </div>

          <div className='import-container'>
            <div className='flex center flex-vertical'>
              <h1 className='h1'>Import Course</h1>
              <p className='marginTopBot-md export-import-desc'>
                Be sure you want to import a course before continuing. By using this feature, you will create a new course. We will only accept properly formatted .json files, such as those downloaded from Export Course.
              </p>
              <Form>
                <label
                  htmlFor='course-import'
                  className='course-import-button'
                  onChange={this.handleFile}>
                  Import Course
                </label>
                <p className='marginTop-xs'>
                  {`Selected File: ${this.state.fileName}`}
                </p>
                <input
                  id='course-import'
                  className='hidden-input'
                  type='file'
                  onChange={this.handleFile}
                  accept='.json'
                />
                <SaveButton
                  text="Submit"
                  onPress={this.importCourse}
                  className={`${_.isEmpty(this.state.file) ? 'disabled' : ''}  marginTop-xs`}
                />
              </Form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ExportImportPage

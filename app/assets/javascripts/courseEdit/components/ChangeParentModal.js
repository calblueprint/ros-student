import _ from 'underscore'
import React, { PropTypes } from 'react'
import Modal from 'react-bootstrap-modal'

import request from '../../shared/requests/request'

import { APIRoutes } from '../../shared/routes'
import { Images } from '../../utils/image_helpers'

import Form from '../../shared/components/forms/Form'
import SimpleModal from '../../shared/components/widgets/SimpleModal'

class ChangeParentModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      courses: [],
      activeCourseIds: new Set()
    }

    /* Get courses for admin to selectively activate */
    this.getCourses()
    this.generateCodes = _.bind(this.generateCodes, this)
  }

  getCourses() {
    const path = APIRoutes.getAdminPublishedCourses()

    request.get(path, (response) => {
      this.setState({ courses: response.courses })
    }, (error) => {
      console.log('error')
    })
  }

  updateCourseList(course) {
    /*  Removes `course` if already in active course list
        Otherwise adds `course` to active course list  */
    var activeCourseIds = this.state.activeCourseIds
    if (activeCourseIds.has(course.id)) {
      activeCourseIds.delete(course.id)
    } else {
      activeCourseIds.add(course.id)
    }
  }

  generateCodes(e) {
    e.preventDefault()
    const path = APIRoutes.codeCsvListPath()
    var params = {
      code_csv: {
        name: inputs.name,
      },
      code_csv_args: {
        amount: parseInt(inputs.amount),
        course_ids: JSON.stringify([...this.state.activeCourseIds]),
      },
    }
    request.post(path, params, (response) => {
      this.props.update(response.code_csv)
      console.log(response)
    }, (error) => {
      console.log(error)
    })
    this.props.closeModal()
  }

  renderCourses() {
    return this.state.courses.map((value) => {
      return (
        <li key={value.id}>
          <GenerateCodeCsvCourseCard
            course={value}
            selected={false}
            updateActive={_.bind(this.updateCourseList, this)}
          />
        </li>
      )
    })
  }

  render() {
    return (
      <SimpleModal
        title='Generate New Codes'
        isModalOpen={this.props.isChangeOpen}
        closeModal={this.props.closeModal}
      >
        <div>
          <Form
            className='generate_code_csv_form'
            id='generate_code_csv_form'
            method='post'
            action={this.props.action}
          >

            <h3 className="input-label">Select courses</h3>
            <div className='generate-code-csv-course-list'>
              <ul>{this.renderCourses()}</ul>
            </div>
            <button
              className='button'
              onClick={this.generateCodes}
            >
              Submit
            </button>
          </Form>
        </div>
      </SimpleModal>
    )
  }
}

ChangeParentModal.propTypes = {
  isChangeOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  objectType: PropTypes.string.isRequired,
}

export default ChangeParentModal

/**
 * Modal on CodeCsvListPage that shows when an admin wants to generate new
 * code_csv's to register new students. Fields rendered include a name for the
 * list of codes, the number of codes to be generated, whether the codes
 * should register students to be self-paced or instructor-led, and a list of
 * selectable courses that the codes should be assigned to
 *
 * @prop isModalOpen    - bool indicating whether the modal is currently opened
 * @prop closeModal     - parent method that sets closed state of modal
 * @prop update         - parent callback method that updates the set of code_csvs
 *                        maintained on the parent page
 */

import _ from 'underscore'
import React, { PropTypes } from 'react'
import Modal from 'react-bootstrap-modal'

import request from '../../shared/requests/request'

import { getUser, setUser } from '../../utils/helpers/user_helpers'
import { getInputToParams } from '../../utils/helpers/form_helpers'
import { APIRoutes } from '../../shared/routes'
import { Images } from '../../utils/helpers/image_helpers'

import Form from '../../shared/components/forms/Form'
import Input from '../../shared/components/forms/Input'
import SimpleModal from '../../shared/components/widgets/SimpleModal'
import GenerateCodeCsvCourseCard from './GenerateCodeCsvCourseCard'
import SaveButton from '../../shared/components/widgets/SaveButton'

class GenerateCodeCsvModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = this.formDefault(true)

    /* Get courses for admin to selectively activate */
    this.getCourses()
    this.generateCodes = _.bind(this.generateCodes, this)
    this.closeModal = _.bind(this.closeModal, this)
  }

  formDefault(initial) {
    return {
      formFields: {
        name: {
          label: 'Name',
          value: '',
          name: 'Name for this set of codes',
          onChange: _.bind(this.handleChange, this, 'name')
        },
        numberOfCodes: {
          label: 'Number of Codes',
          value: '',
          name: 'Number of codes to generate',
          onChange: _.bind(this.handleChange, this, 'numberOfCodes')
        },
      },
      courses: initial ? [] : this.state.courses,
      activeCourseIds: new Set(),
      tabIndex: 0,
    }
  }

  handleChange(attr, e) {
    const formFields = this.state.formFields
    formFields[attr].value = e.target.value
    this.setState({ formFields: formFields })
  }

  renderFields() {
    return (
      _.pairs(this.state.formFields).map((values) => {
        return <Input key={values[0]} {...values[1]} />
      })
    )
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

  generateCodes(event, onSuccess, onFailure) {
    event.preventDefault()
    const path = APIRoutes.codeCsvListPath()
    var inputs = getInputToParams(this.state.formFields)
    var params = {
      code_csv: {
        name: inputs.name,
      },
      code_csv_args: {
        amount: parseInt(inputs.amount),
        course_ids: JSON.stringify([...this.state.activeCourseIds]),
        self_paced: this.state.tabIndex == 0 ? false : true,
      },
    }
    request.post(path, params, (response) => {
      this.props.update(response.code_csv)
      onSuccess && onSuccess()
      this.props.closeModal()
      this.setState(this.formDefault(false))
    }, (error) => {
      console.log(error)
      onFailure && onFailure()
    })
  }

  handleClick(index, e) {
    e.preventDefault()

    this.setState({ tabIndex: index })
  }

  isActiveStyle(index) {
    return this.state.tabIndex == index ? 'active' : ''
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

  closeModal() {
    this.setState(this.formDefault(false))
    this.props.closeModal()
  }

  render() {
    return (
      <SimpleModal
        title='Generate New Codes'
        isModalOpen={this.props.isModalOpen}
        closeModal={this.closeModal}
      >
        <div>
          <Form
            className='generate_code_csv_form'
            id='generate_code_csv_form'
            method='post'
            action={this.props.action}
          >

            {this.renderFields()}
            <div className='marginTopBot-xxs'>
              <h3 className='input-label marginTop-xs marginBot-xxs'>Enrollment type</h3>
              <button
                className={`tab ${this.isActiveStyle(0)}`}
                onClick={this.handleClick.bind(this, 0)}>
                Instructor Led
              </button>
              <button
                className={`tab ${this.isActiveStyle(1)}`}
                onClick={this.handleClick.bind(this, 1)}>
                Self Paced
              </button>
            </div>

            <h3 className='input-label marginTop-xs marginBot-xxs'>Select courses</h3>
            <div className='generate-code-csv-course-list'>
              <ul>{this.renderCourses()}</ul>
            </div>

            <SaveButton
              text='Submit'
              onPress={this.generateCodes}
            />
          </Form>
        </div>
      </SimpleModal>
    )
  }
}

GenerateCodeCsvModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
}

export default GenerateCodeCsvModal

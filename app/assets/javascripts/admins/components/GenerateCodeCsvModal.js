import _ from 'underscore'
import React from 'react'

import request from '../../shared/requests/request'

import { getUser, setUser } from '../../utils/user_helpers'
import { getInputToParams } from '../../utils/form_helpers'
import { APIRoutes } from '../../shared/routes'

import Form from '../../shared/components/forms/Form'
import Input from '../../shared/components/forms/Input'
import GenerateCodeCsvCourseCard from './GenerateCodeCsvCourseCard'

class GenerateCodeCsvModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
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
      courses: [],
      activeCourseIds: new Set()
    }

    // Get courses for admin to selectively activate
    this.getCourses()
    this.generateCodes = _.bind(this.generateCodes, this)
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
    const path = APIRoutes.getCourses()

    request.get(path, (response) => {
      this.setState( { courses: response.courses })
    }, (error) => {
      console.log('error')
    })
  }

  updateCourseList(course) {
    // Removes `course` if already in active course list
    // Otherwise adds `course` to active course list
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
    var inputs = getInputToParams(this.state.formFields)
    var params = {
      code_csv: {
        name: inputs.name
      },
      code_csv_args: {
        amount: parseInt(inputs.amount),
        course_ids: JSON.stringify([...this.state.activeCourseIds])
      }
    }
    request.post(path, params, (response) => {
    }, (error) => {
      console.log(error)
    })
  }

  renderCourses() {
    return this.state.courses.map((value) => {
      return (
        <li>
          <GenerateCodeCsvCourseCard course={value} selected={false} updateActive={_.bind(this.updateCourseList, this)}/>
        </li>
      )
    })
  }

  render() {
    return (
      <div>
        <Form
          className='generate_code_csv_form'
          id='generate_code_csv_form'
          method='post'
          action={this.props.action}>

          <h1> Generate sign-up codes </h1>
          {this.renderFields()}
          <ol>{this.renderCourses()}</ol>

          <button onClick={this.generateCodes}>Submit</button>
        </Form>
      </div>
    )
  }
}

export default GenerateCodeCsvModal
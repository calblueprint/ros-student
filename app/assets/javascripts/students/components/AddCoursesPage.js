import _ from 'underscore'
import React from 'react'
import update from 'immutability-helper'

import Input from '../../shared/components/forms/Input'
import SaveButton from '../../shared/components/widgets/SaveButton'

class AddCoursesPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      formFields: {
        key: {
          label: 'Code',
          value: '',
          onChange: _.bind(this.handleKeyChange, this, 'key'),
          error: '',
        },
      },
    }

    this.addCourses = this.addCourses.bind(this)
  }

  handleKeyChange(attr, e) {
    this.setState({ formFields: update(this.state.formFields, {
      key: {
        value: {
          $set: e.target.value
        }
      },
    })})
  }

  addCourses(e, onSuccess, onFailure) {
    e.preventDefault()
  }

  render() {
    return (
      <div>
        <div>Add Courses</div>
        <p>Please enter the code here to add additional courses to your account.</p>
        <form>
          <Input {...this.state.formFields.key} />
          <SaveButton
            className='marginTop-xs'
            text="Submit"
            onPress={this.addCourses}
          />
        </form>

      </div>
    )
  }
}

export default AddCoursesPage

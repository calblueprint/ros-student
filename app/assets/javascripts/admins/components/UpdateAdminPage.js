import _ from 'underscore'
import React from 'react'

import request from '../../shared/requests/request'

import { getUser, setUser } from '../../utils/helpers/user_helpers'
import { getInputToParams } from '../../utils/helpers/form_helpers'
import { APIRoutes } from '../../shared/routes'

import Form from '../../shared/components/forms/Form'
import Input from '../../shared/components/forms/Input'

class UpdateAdminPage extends React.Component {
  constructor(props) {
    super(props)

    this.id = this.props.routeParams.id
    // Assume we're modifying only our user
    this.user = getUser()
    this.state = this.getUserFields()
  }

  getUserFields() {
    return {
      formFields: {
        email: {
          label: 'Email',
          value: this.user.email,
          onChange: _.bind(this.handleChange, this, 'email'),
          error: '',
        },
        username: {
          label: 'Username',
          value: this.user.username,
          onChange: _.bind(this.handleChange, this, 'username'),
          error: '',
        },
        firstName: {
          label: 'First Name',
          value: this.user.first_name,
          onChange: _.bind(this.handleChange, this, 'firstName'),
          error: '',
        },
        lastName: {
          label: 'Last Name',
          value: this.user.last_name,
          onChange: _.bind(this.handleChange, this, 'lastName'),
          error: '',
        },
        newPassword: {
          label: 'New Password',
          value: '',
          type: 'password',
          onChange: _.bind(this.handleChange, this, 'newPassword'),
          error: '',
        },
        confirmPassword: {
          label: 'Confirm Password',
          value: '',
          type: 'password',
          onChange: _.bind(this.handleChange, this, 'confirmPassword'),
          error: '',
        },
        currentPassword: {
          label: 'Current Password',
          value: '',
          type: 'password',
          onChange: _.bind(this.handleChange, this, 'currentPassword'),
          error: '',
        },
      }
    }
  }

  updateUser(e) {
    e.preventDefault()

    const path = APIRoutes.updateAdminPath(this.id)
    const params = { admin: getInputToParams(this.state.formFields) }

    request.update(path, params, (response) => {
      setUser(response.admin)
      this.user = response.admin
      this.setState(this.getUserFields())
    }, (error) => {
      console.log(error)
    })
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
  render() {
    return (
      <div>
        <h1>Update Profile</h1>
        <Form>
          {this.renderFields()}

          <div className='actions'>
            <input type='submit' name='commit' value='Update user' onClick={this.updateUser.bind(this)} />
          </div>
        </Form>
      </div>
    )
  }
}

export default UpdateAdminPage

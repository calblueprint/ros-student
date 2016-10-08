import React from 'react'

import Form from '../../shared/components/forms/Form'

class ForgotPasswordForm extends React.Component {
  render() {
    return (
      <div>
        <Form
          className='forgot_password_form'
          id='forgot_password_form'
          action={this.props.action}
          method='post'>

          <div className="field">
            <label htmlFor="admin_email">Email</label><br />
            <input
              id="admin_email"
              autoFocus="autofocus"
              type="email"
              value=""
              name={`${this.props.userType}[email]`}
            />
          </div>

          <div className="actions">
            <input type="submit" name="commit" value="Send me reset password instructions" />
          </div>
        </Form>
      </div>
    )
  }
}

export default ForgotPasswordForm

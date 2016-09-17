import React from 'react'

import LoginForm from './LoginForm'

class StudentLoginPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Student Login Page!</h1>
        <LoginForm userType='student' action='/students/sign_in' />
      </div>
    )
  }
}

export default StudentLoginPage

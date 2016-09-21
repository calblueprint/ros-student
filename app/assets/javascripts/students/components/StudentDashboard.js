import React from 'react'

class StudentDashboard extends React.Component {
  render() {
    return (
      <div>
        <h1>Student Homepage</h1>
        <a href='/students/sign_out' data-method="delete">Sign Out</a>
      </div>
    )
  }
}

export default StudentDashboard

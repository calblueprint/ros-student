import React from 'react'

import StudentProfile from '../../students/components/StudentProfile'

class StudentProfilePage extends React.Component {
  render() {
    return (
      <div className='container'>
        <div className='marginTop-sm profile-container'>
          <StudentProfile id={this.props.routeParams.id} />
        </div>
      </div>
    )
  }
}

export default StudentProfilePage

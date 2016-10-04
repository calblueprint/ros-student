import React from 'react'

class UpdateStudentPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Update Profile</h1>
        <Form
          className='update_form'
          id='update_form'
          action={RailsRoutes.studentsSignUpPath}
          method='post'>

          <div className='field'>
            <label htmlFor='student_email'>Email</label><br />
            <input autoFocus='autofocus' type='email' name='student[email]' id='student_email' />
          </div>

          <div className='field'>
            <label htmlFor='student_username'>Username</label><br />
            <input type='text' name='student[username]' id='student_username' />
          </div>

          <div className='field'>
            <label htmlFor='student_first_name'>First Name</label><br />
            <input type='text' name='student[first_name]' id='student_first_name' />
          </div>

          <div className='field'>
            <label htmlFor='student_last_name'>Last Name</label><br />
            <input type='text' name='student[last_name]' id='student_last_name' />
          </div>

          <div className='field'>
            <label htmlFor='student_password'>New Password</label>
            <em>(8 characters minimum)</em>
            <br />
            <input autoComplete='off' type='password' name='student[password]' id='student_password' />
          </div>

          <div className='field'>
            <label htmlFor='student_password_confirmation'>Password confirmation</label><br />
            <input autoComplete='off' type='password' name='student[password_confirmation]' id='student_password_confirmation' />
          </div>

          <div className='field'>
            <label htmlFor='student_current_password'>Confirm Password</label>
            <em></em>
            <br />
            <input autoComplete='off' type='password' name='student[current_password]' id='student_current_password' />
          </div>



          <div className='actions'>
            <input type='submit' name='commit' value='Sign up' />
          </div>
        </Form>
      </div>
    )
  }
}

export default UpdateStudentPage

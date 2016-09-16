class StudentForgotPasswordPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Forgot Password?</h1>
        <ForgotPasswordForm userType='student' action='/students/password' />
      </div>
    )
  }
}

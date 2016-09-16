const Link = ReactRouter.Link

class AdminForgotPasswordPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Forgot Password?</h1>
        <ForgotPasswordForm userType='admin' path='/admins/password' />
      </div>
    )
  }
}

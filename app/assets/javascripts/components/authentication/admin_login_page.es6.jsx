const Link = ReactRouter.Link

class AdminLoginPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Admin Login Page!</h1>
        <LoginForm userType='admin' action='/admins/sign_in' />

      </div>
    )
  }
}

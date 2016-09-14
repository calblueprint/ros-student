const Router = ReactRouter.Router
const Route = ReactRouter.Route
const DefaultRoute = ReactRouter.DefaultRoute
const RouteHandler = ReactRouter.RouteHandler
// const IndexRoute = ReactRouter.IndexRoute
// const Link = ReactRouter.Link

class App extends React.Component {
  render() {
    return (
      <RouteHandler {...this.props}/>
    );
  }
}

this.LoginRoutes = (
  <Route handler={App} path="/">
    <DefaultRoute handler={LoginPage} />
    <Route handler={SignUpPage} path="sign_up" />
    <Route handler={ForgotPasswordPage} path="forgot_password" />
  </Route>
)

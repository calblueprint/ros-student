const Router = ReactRouter.Router
const Route = ReactRouter.Route
const DefaultRoute = ReactRouter.DefaultRoute
const RouteHandler = ReactRouter.RouteHandler

this.LoginRoutes = (
  <Route name='StudentLoginPage' handler={App} path="/">
    <DefaultRoute handler={StudentLoginPage} />
    <Route name='SignUpPage' handler={SignUpPage} path="sign_up" />
    <Route name='AdminLoginPage' handler={AdminLoginPage} path="admins/sign_in" />
    <Route name='StudentForgotPasswordPage' handler={StudentForgotPasswordPage} path="admins/forgot_password" />
    <Route name='AdminForgotPasswordPage' handler={AdminForgotPasswordPage} path="students/forgot_password" />
  </Route>
)

class ReactRoutes {
  // Authentication Flow
  static get rootPath()                   { return '/' }
  static get studentsSignUpPath()         { return '/students/sign_up' }
  static get adminsSignInPath()           { return '/admins/sign_in' }
  static get adminsForgotPasswordPath()   { return '/admins/forgot_password' }
  static get studentsForgotPasswordPath() { return '/students/forgot_password' }

  // Shared Flow
  static get dashboardPath()              { return '/dashboard' }
}


class RailsRoutes {
  static get adminsSignInPath() { '/admins/sign_in' }
  static get studentsSignInPath() { return '/students/sign_in' }

  static get adminsForgotPasswordPath() { '/admins/password' }
  static get studentsForgotPasswordPath() { return '/students/password' }

  static get studentsSignUpPath() { return '/students' }

  static get adminsSignOutPath() { return '/admins/sign_out' }
  static get studentsSignOutPath() { return '/students/sign_out' }
}

class APIRoutes {

}

export {
  ReactRoutes,
  RailsRoutes,
  APIRoutes,
}

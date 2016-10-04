class ReactRoutes {
  // Authentication Flow
  static get rootPath()                   { return '/' }
  static get studentsSignUpPath()         { return '/students/sign_up' }
  static get adminsSignInPath()           { return '/admins/sign_in' }
  static get adminsForgotPasswordPath()   { return '/admins/forgot_password' }
  static get studentsForgotPasswordPath() { return '/students/forgot_password' }

  // Shared Flow
  static get dashboardPath()              { return '/dashboard' }

  // Admin Flow
  static get updateAdminPath()            { return '/admins/:id/edit'}
  static get updateStudentPath()          { return 'students/:id/edit' }

  // Student Flow
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
  // Students
  static createRoute(route) { return `/api/${route}` }

  static updateAdminPath(id)   { return APIRoutes.createRoute(`admins/${id}`) }
  static updateStudentPath(id) { return APIRoutes.createRoute(`students/${id}`) }
}

export {
  ReactRoutes,
  RailsRoutes,
  APIRoutes,
}

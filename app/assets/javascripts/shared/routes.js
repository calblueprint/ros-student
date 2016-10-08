class ReactRoutes {
  static getId(id, name) { return id || `:${name}` }
  // Authentication Flow
  static rootPath()                   { return '/' }
  static studentsSignUpPath()         { return '/students/sign_up' }
  static adminsSignInPath()           { return '/admins/sign_in' }
  static adminsForgotPasswordPath()   { return '/admins/forgot_password' }
  static studentsForgotPasswordPath() { return '/students/forgot_password' }

  // Shared Flow
  static dashboardPath()              { return '/dashboard' }

  // Admin Flow
  static updateAdminPath(id)          { return `/admins/${ReactRoutes.getId(id, 'id')}/edit`}
  static updateStudentPath(id)        { return `/students/${ReactRoutes.getId(id, 'id')}/edit` }

  // Student Flow
}


class RailsRoutes {
  static adminsSignInPath() { '/admins/sign_in' }
  static studentsSignInPath() { return '/students/sign_in' }

  static adminsForgotPasswordPath() { '/admins/password' }
  static studentsForgotPasswordPath() { return '/students/password' }

  static studentsSignUpPath() { return '/students' }

  static adminsSignOutPath() { return '/admins/sign_out' }
  static studentsSignOutPath() { return '/students/sign_out' }
}

class APIRoutes {
  // Students
  static createRoute(route) { return `/api/${route}` }

  static updateAdminPath(id)   { return APIRoutes.createRoute(`admins/${id}`) }
  static updateStudentPath(id) { return APIRoutes.createRoute(`students/${id}`) }

  static getAdminPath(id)      { return APIRoutes.createRoute(`admins/${id}`) }
  static getStudentPath(id)    { return APIRoutes.createRoute(`students/${id}`) }
}

export {
  ReactRoutes,
  RailsRoutes,
  APIRoutes,
}

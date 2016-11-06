class ReactRoutes {
  static getId(id, name) { return id || `:${name}` }

  // Authentication Flow
  static rootPath()                   { return '/' }
  static studentsSignUpPath()         { return '/students/sign_up' }
  static adminsSignInPath()           { return '/admins/sign_in' }
  static adminsForgotPasswordPath()   { return '/admins/forgot_password' }
  static studentsForgotPasswordPath() { return '/students/forgot_password' }
  static designPath()                 { return '/design' }
  static studentsRenderPath()         { return '/students'}

  // Shared Flow
  static dashboardPath()              { return '/dashboard' }

  // Admin Flow
  static updateAdminPath(id)          { return `/admins/${ReactRoutes.getId(id, 'id')}/edit`}

  // Student Flow
  static updateStudentPath(id)        { return `/students/${ReactRoutes.getId(id, 'id')}/edit` }
  static courseOutlinePath(id)        { return `/courses/${ReactRoutes.getId(id, 'id')}/outline`}

  // Course Flow
  static coursePath(id)               { return `/courses/${ReactRoutes.getId(id, 'id')}` }


  // Course Edit Flow
  static courseEditPath(id)           { return `/courses/${ReactRoutes.getId(id, 'id')}/edit` }
}


class RailsRoutes {
  static adminsSignInPath() { return '/admins/sign_in' }
  static studentsSignInPath() { return '/students/sign_in' }

  static adminsForgotPasswordPath() { '/admins/password' }
  static studentsForgotPasswordPath() { return '/students/password' }

  static studentsSignUpPath() { return '/students' }

  static adminsSignOutPath() { return '/admins/sign_out' }
  static studentsSignOutPath() { return '/students/sign_out' }
  static coursePath(id)        { return `/courses/${id}` }

  static courseCreatePath() { return '/courses' }
}

class APIRoutes {
  // Students
  static createRoute(route)    { return `/api/${route}` }

  static updateAdminPath(id)   { return APIRoutes.createRoute(`admins/${id}`) }
  static updateStudentPath(id) { return APIRoutes.createRoute(`students/${id}`) }

  static getAdminPath(id)      { return APIRoutes.createRoute(`admins/${id}`) }
  static getStudentPath(id)    { return APIRoutes.createRoute(`students/${id}`) }
  static getStudentCourseOutlinePath(id) { return APIRoutes.createRoute(`students/courses/${id}/outline`) }
  static getStudentCourseSidebarPath(id) { return APIRoutes.createRoute(`students/courses/${id}/sidebar`) }

  static verifyCodePath()      { return APIRoutes.createRoute(`codes/verify`) }

  // Courses
  static getCourses()          { return APIRoutes.createRoute(`courses`)}

  // Course Edit
  static getEditCoursePath(id)   { return APIRoutes.createRoute(`courses/${id}/edit`)}
  static editComponentPath(id)   { return APIRoutes.createRoute(`admins/components/${id}`)}
  static editSubsectionPath(id)  { return APIRoutes.createRoute(`admins/subsections/${id}`)}
  static editSectionPath(id)     { return APIRoutes.createRoute(`admins/sections/${id}`)}
  static editCoursePath(id)      { return APIRoutes.createRoute(`admins/courses/${id}`)}
  static createSectionPath(id)   { return APIRoutes.createRoute(`admins/courses/${id}/sections`)}

  // Codes
  static createSubsectionPath(id) { return APIRoutes.createRoute(`admins/sections/${id}/subsections`)}
  static createComponentPath(id) { return APIRoutes.createRoute(`admins/subsections/${id}/components`)}
}

export {
  ReactRoutes,
  RailsRoutes,
  APIRoutes,
}

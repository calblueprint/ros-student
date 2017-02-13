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
  static adminProfilePath(id)         { return `/admins/${ReactRoutes.getId(id, 'id')}/profile`}
  static codeCsvListPath()            { return `/admins/code_csvs`}
  static courseToolsPath()            { return `/admins/courses/tools`}
  static usersListPath()              { return `/admins/users`}

  // Student Flow
  static studentProfilePath(id)       { return `/students/${ReactRoutes.getId(id, 'id')}/profile`}
  static courseOutlinePath(id)        { return `/courses/${ReactRoutes.getId(id, 'id')}/outline`}

  // Course Flow
  static coursePath(id)               { return `/students/courses/${ReactRoutes.getId(id, 'id')}` }


  // Course Edit Flow
  static courseEditPath(id)           { return `/courses/${ReactRoutes.getId(id, 'id')}/edit` }

  // Codes
  static codeCsvListPath()            { return `/admins/code_csvs` }
}


class RailsRoutes {
  static adminsSignInPath() { return '/admins/sign_in' }
  static studentsSignInPath() { return '/students/sign_in' }

  static adminsForgotPasswordPath() { '/admins/password' }
  static studentsForgotPasswordPath() { return '/students/password' }

  static studentsSignUpPath() { return '/students' }

  static adminsSignOutPath() { return '/admins/sign_out' }
  static studentsSignOutPath() { return '/students/sign_out' }

  // Shared
  static dashboardPath() { return '/dashboard' }

  // Student
  static coursePath(id)        { return `/students/courses/${id}` }

  // Admin
  static courseCreatePath()    { return '/courses' }
  static courseEditPath(id)    { return `/courses/${id}/edit` }
  static adminProfilePath(id)  { return `/admins/${ReactRoutes.getId(id, 'id')}/profile`}
  static codeCsvListPath()     { return `/admins/code_csvs`}
}

class APIRoutes {
  static createRoute(route)    { return `/api/${route}` }

  // Students
  static verifyCodePath()      { return APIRoutes.createRoute(`codes/verify`) }
  static getStudentPath(id)    { return APIRoutes.createRoute(`students/${id}`) }
  static getStudentCourseOutlinePath(id) { return APIRoutes.createRoute(`students/courses/${id}/outline`) }
  static getStudentCourseSidebarPath(id) { return APIRoutes.createRoute(`students/courses/${id}/sidebar`) }
  static getStudentCoursesPath() { return APIRoutes.createRoute(`students/courses`) }
  static getPublishedCourses()   { return APIRoutes.createRoute(`students/courses?is_published=true`) }
  // FIXME: Refactor to function taking optional params dictionary and converts it to url endpoint

  // Admins
  static importCoursePath()    { return APIRoutes.createRoute(`admins/courses/import`)}
  static exportCoursePath(id)  { return APIRoutes.createRoute(`admins/courses/${id}/export`)}
  static createAdminPath()     { return APIRoutes.createRoute(`admins`) }
  static getStudentsPath()     { return APIRoutes.createRoute(`students`) }
  static getAdminsPath()       { return APIRoutes.createRoute(`admins`) }
  static updateAdminPath(id)   { return APIRoutes.createRoute(`admins/${id}`) }
  static updateStudentPath(id) { return APIRoutes.createRoute(`students/${id}`) }
  static getAdminPath(id)      { return APIRoutes.createRoute(`admins/${id}`) }

  static deleteAdminPath(id)   { return APIRoutes.createRoute(`admins/${id}`) }
  static deleteStudentPath(id) { return APIRoutes.createRoute(`students/${id}`) }
  static getAdminCoursesPath() { return APIRoutes.createRoute(`admins/courses`) }
  static getAdminPublishedCourses()   { return APIRoutes.createRoute(`admins/courses?is_published=true`) }

  // Codes
  static codeCsvListPath()       { return APIRoutes.createRoute(`admins/code_csvs`) }
  static codeCsvDownloadPath(id) { return APIRoutes.createRoute(`admins/code_csvs/${id}/download.csv`) }

  // Courses
  static getSubsectionPath(id)       { return APIRoutes.createRoute(`students/subsections/${id}`) }
  static getComponentProgressPath(id) { return APIRoutes.createRoute(`students/components/${id}/component_progresses`) }
  static createComponentProgressPath(id) { return APIRoutes.createRoute(`students/components/${id}/component_progresses`)}

  // Course Edit
  static getEditCoursePath(id)   { return APIRoutes.createRoute(`admins/courses/${id}/edit`) }
  static deleteCoursePath(id)    { return APIRoutes.createRoute(`admins/courses/${id}`) }
  static editComponentPath(id)   { return APIRoutes.createRoute(`admins/components/${id}`) }
  static editSubsectionPath(id)  { return APIRoutes.createRoute(`admins/subsections/${id}`) }
  static editSectionPath(id)     { return APIRoutes.createRoute(`admins/sections/${id}`) }
  static editCoursePath(id)      { return APIRoutes.createRoute(`admins/courses/${id}`) }
  static createSectionPath(id)   { return APIRoutes.createRoute(`admins/courses/${id}/sections`) }
  static createSubsectionPath(id) { return APIRoutes.createRoute(`admins/sections/${id}/subsections`) }
  static createComponentPath(id) { return APIRoutes.createRoute(`admins/subsections/${id}/components`) }
}

export {
  ReactRoutes,
  RailsRoutes,
  APIRoutes,
}

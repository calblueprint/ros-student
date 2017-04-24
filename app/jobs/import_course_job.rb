class ImportCourseJob < ActiveJob::Base
  queue_as :default

  def perform(admin_id, file)
    admin = Admin.find_by(id: admin_id)
    return unless admin

    result = ImportCourse.new(file).import_course
    AdminMailer.imported_course(admin, result).deliver_now
  end
end

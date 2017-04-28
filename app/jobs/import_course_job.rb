class ImportCourseJob < ActiveJob::Base
  include SuckerPunch::Job

  def perform(admin_id, file)
    ActiveRecord::Base.connection_pool.with_connection do
      admin = Admin.find_by(id: admin_id)
      return unless admin

      result = ImportCourse.new(file).import_course
      AdminMailer.imported_course(admin, result).deliver_now
    end
  end
end

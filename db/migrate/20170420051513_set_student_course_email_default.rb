class SetStudentCourseEmailDefault < ActiveRecord::Migration
  def change
    change_column_default :student_courses, :sent_email, false
  end
end

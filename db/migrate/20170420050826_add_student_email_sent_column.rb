class AddStudentEmailSentColumn < ActiveRecord::Migration
  def change
    add_column :student_courses, :sent_email, :boolean
  end
end

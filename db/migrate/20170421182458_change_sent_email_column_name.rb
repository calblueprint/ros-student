class ChangeSentEmailColumnName < ActiveRecord::Migration
  def change
    rename_column :student_courses, :sent_email, :completed
  end
end

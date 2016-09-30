class ChangeCourseBooleanDefaults < ActiveRecord::Migration
  def change
    change_column :student_courses, :started, :boolean, :default => true
    change_column :student_courses, :started, :boolean, :default => true
  end
end

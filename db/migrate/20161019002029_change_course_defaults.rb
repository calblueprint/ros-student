class ChangeCourseDefaults < ActiveRecord::Migration
  def change
    change_column_default :courses, :name, 'Course Name'
    change_column_default :courses, :description, 'This is a course description.'
  end
end

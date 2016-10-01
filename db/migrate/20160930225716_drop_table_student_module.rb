class DropTableStudentModule < ActiveRecord::Migration
  def change
    drop_table :student_modules
  end
end

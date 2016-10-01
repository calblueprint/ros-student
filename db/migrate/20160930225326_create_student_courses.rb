class CreateStudentCourses < ActiveRecord::Migration
  def change
    create_table :student_courses do |t|
      t.integer :course_id
      t.integer :student_id
      t.boolean :started
      t.boolean :self_paced

      t.timestamps null: false
    end
  end
end

class CreateCodeCourses < ActiveRecord::Migration
  def change
    create_table :code_courses do |t|
      t.integer :code_id
      t.integer :course_id

      t.timestamps null: false
    end
  end
end

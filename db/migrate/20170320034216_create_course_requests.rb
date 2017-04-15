class CreateCourseRequests < ActiveRecord::Migration
  def change
    create_table :course_requests do |t|
      t.integer :request_id
      t.integer :course_id

      t.timestamps null: false
    end
  end
end

class CreateSubsectionProgresses < ActiveRecord::Migration
  def change
    create_table :subsection_progresses do |t|
      t.integer :student_id
      t.integer :subsection_id
      t.boolean :completed

      t.timestamps null: false
    end
  end
end

class CreateStudentModules < ActiveRecord::Migration
  def change
    create_table :student_modules do |t|
      t.integer :module_id
      t.integer :student_id
      t.boolean :started
      t.boolean :self_paced

      t.timestamps null: false
    end
  end
end

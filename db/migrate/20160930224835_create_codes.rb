class CreateCodes < ActiveRecord::Migration
  def change
    create_table :codes do |t|
      t.string :key
      t.integer :student_id

      t.timestamps null: false
    end
  end
end

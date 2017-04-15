class CreateRequests < ActiveRecord::Migration
  def change
    create_table :requests do |t|
      t.integer :student_id
      t.integer :state

      t.timestamps null: false
    end
  end
end

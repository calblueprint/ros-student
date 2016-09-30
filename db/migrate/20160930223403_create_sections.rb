class CreateSections < ActiveRecord::Migration
  def change
    create_table :sections do |t|
      t.string :title
      t.integer :module_id
      t.integer :number

      t.timestamps null: false
    end
  end
end

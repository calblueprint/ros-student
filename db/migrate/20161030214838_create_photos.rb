class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.timestamps null: false

      t.integer :parent_id
      t.string :parent_type
      t.string :image
    end
  end
end

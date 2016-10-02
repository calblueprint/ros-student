class CreateComponents < ActiveRecord::Migration
  def change
    create_table :components do |t|
      t.integer :type
      t.string :audio_url
      t.string :content_url
      t.integer :position
      t.integer :subsection_id
      
      t.timestamps null: false
    end
  end
end

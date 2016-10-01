class CreateSubsections < ActiveRecord::Migration
  def change
    create_table :subsections do |t|
      t.string :title
      t.integer :section_id
      t.integer :position

      t.timestamps null: false
    end
  end
end

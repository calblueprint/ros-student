class AddPublishToCourse < ActiveRecord::Migration
  def change
    add_column :courses, :is_published, :boolean, default: false
  end
end

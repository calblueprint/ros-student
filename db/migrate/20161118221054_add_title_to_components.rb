class AddTitleToComponents < ActiveRecord::Migration
  def change
    add_column :components, :title, :string
    add_column :components, :key, :string
  end
end

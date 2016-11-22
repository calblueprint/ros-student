class RemoveColumnFromComponents < ActiveRecord::Migration
  def change
    remove_column :components, :key
  end
end

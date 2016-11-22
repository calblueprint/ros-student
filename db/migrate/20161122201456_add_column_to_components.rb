class AddColumnToComponents < ActiveRecord::Migration
  def change
    add_column :components, :form_key, :string
  end
end

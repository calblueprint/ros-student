class AddDefaultBackToUsername < ActiveRecord::Migration
  def change
    change_column :admins, :username, :string, default: ""
  end
end

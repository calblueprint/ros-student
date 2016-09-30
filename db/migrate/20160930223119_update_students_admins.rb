class UpdateStudentsAdmins < ActiveRecord::Migration
  def change
    add_column :students, :first_name, :string, default: ''
    add_column :students, :last_name, :string, default: ''
    add_column :students, :username, :string, default: ''

    add_column :admins, :first_name, :string, default: ''
    add_column :admins, :last_name, :string, default: ''
    add_column :admins, :username, :string, default: ''
  end
end

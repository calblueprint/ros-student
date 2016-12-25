class RemoveDefaultUsernameForAdmins < ActiveRecord::Migration
  def change
    change_column :admins, :username, :string, default: nil
  end
end

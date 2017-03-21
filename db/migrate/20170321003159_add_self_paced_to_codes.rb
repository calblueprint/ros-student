class AddSelfPacedToCodes < ActiveRecord::Migration
  def change
    add_column :codes, :self_paced, :boolean, :default => false
  end
end

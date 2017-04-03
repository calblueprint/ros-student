class Requests < ActiveRecord::Migration
  def change
    change_column :requests, :state, :integer, :default => 0
  end
end

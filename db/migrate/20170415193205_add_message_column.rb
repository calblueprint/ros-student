class AddMessageColumn < ActiveRecord::Migration
  def change
    add_column :requests, :message, :string
  end
end

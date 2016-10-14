class AddCodeCsvIdToCodes < ActiveRecord::Migration
  def change
    add_column :codes, :code_csv_id, :integer
  end
end

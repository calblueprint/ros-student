class CreateCodeCsvs < ActiveRecord::Migration
  def change
    create_table :code_csvs do |t|
      t.string :name

      t.timestamps null: false
    end
  end
end

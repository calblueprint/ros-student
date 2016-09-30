class FixSectionColumnName < ActiveRecord::Migration
  def change
    rename_column :sections, :number, :position
  end
end

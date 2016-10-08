class RenameModuleId < ActiveRecord::Migration
  def change
    rename_column :sections, :module_id, :course_id
  end
end

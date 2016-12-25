class AddColumnComponentId < ActiveRecord::Migration
  def change
    add_column :component_progresses, :component_id, :integer
    remove_column :component_progresses, :subsection_id
  end
end

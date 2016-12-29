class ChangeSubsectionProgressToComponentProgress < ActiveRecord::Migration
  def change
    rename_table :subsection_progresses, :component_progresses
  end
end

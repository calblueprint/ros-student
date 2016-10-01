class ChangeDefaultCompleted < ActiveRecord::Migration
  def self.up
    change_column :subsection_progresses, :completed, :boolean, :default => true
  end

  def self.down
    # You can't currently remove default values in Rails
    raise ActiveRecord::IrreversibleMigration, "Can't remove the default"
  end
end

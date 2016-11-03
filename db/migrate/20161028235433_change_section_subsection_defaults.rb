class ChangeSectionSubsectionDefaults < ActiveRecord::Migration
  def change
    change_column_default :sections, :title, 'Section'
    change_column_default :subsections, :title, 'Subsection'
  end
end

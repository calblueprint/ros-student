# == Schema Information
#
# Table name: component_progresses
#
#  id           :integer          not null, primary key
#  student_id   :integer
#  completed    :boolean          default(TRUE)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  component_id :integer
#

require 'rails_helper'

describe ComponentProgress, type: :model do
  describe 'is not valid because it' do
    let!(:valid_component_progress) { create :component_progress }
    let!(:component_progress) { build :component_progress }
    let!(:other_component_progress) { create :component_progress }

    it 'has no student id' do
      component_progress.student_id = nil
      expect(component_progress.valid?).to be false
    end

    it 'has no subsection id' do
      component_progress.component_id = nil
      expect(component_progress.valid?).to be false
    end
  end
end

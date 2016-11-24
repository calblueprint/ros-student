# == Schema Information
#
# Table name: subsection_progresses
#
#  id            :integer          not null, primary key
#  student_id    :integer
#  subsection_id :integer
#  completed     :boolean          default(TRUE)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

require 'rails_helper'

RSpec.describe SubsectionProgress, type: :model do
  describe 'is not valid because it' do
    let!(:valid_subsection_progress) { create :subsection_progress }
    let!(:subsection_progress) { build :subsection_progress }
    let!(:other_subsection_progress) { create :subsection_progress }

    it 'has no student id' do
      subsection_progress.student_id = nil
      expect(subsection_progress.valid?).to be false
    end

    it 'has no subsection id' do
      subsection_progress.subsection_id = nil
      expect(subsection_progress.valid?).to be false
    end
  end
end

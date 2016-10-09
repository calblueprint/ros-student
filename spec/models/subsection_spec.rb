# == Schema Information
#
# Table name: subsections
#
#  id         :integer          not null, primary key
#  title      :string
#  section_id :integer
#  position   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

RSpec.describe Subsection, type: :model do
  describe 'is not valid because it' do
    let!(:valid_subsection) { create :subsection }
    let!(:subsection) { build :subsection }
    let!(:other_subsection) { create :subsection }

    it 'has no title' do
      subsection.title = nil
      expect(subsection.valid?).to be false
    end

    it 'has no course id' do
      subsection.section_id = nil
      expect(subsection.valid?).to be false
    end

    it 'has no position' do
      subsection.position = nil
      expect(subsection.valid?).to be false
    end

    it 'is a duplicate position from the same course' do
      other_subsection.section_id = valid_subsection.section_id
      other_subsection.position = valid_subsection.position
      expect(other_subsection.valid?).to be false
    end
  end
end

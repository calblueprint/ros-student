# == Schema Information
#
# Table name: sections
#
#  id         :integer          not null, primary key
#  title      :string
#  course_id  :integer
#  position   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

RSpec.describe Section, type: :model do
  describe 'is not valid because it' do
    let!(:valid_section) { create :section }
    let!(:section) { build :section }
    let!(:other_section) { create :section }

    it 'has no title' do
      section.title = nil
      expect(section.valid?).to be false
    end

    it 'has no course id' do
      section.course_id = nil
      expect(section.valid?).to be false
    end

    it 'has no position' do
      section.position = nil
      expect(section.valid?).to be false
    end

    it 'is a duplicate position from the same course' do
      other_section.course_id = valid_section.course_id
      other_section.position = valid_section.position
      expect(other_section.valid?).to be false
    end
  end
end

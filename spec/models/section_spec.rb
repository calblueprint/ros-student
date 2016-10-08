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
  # pending "add some examples to (or delete) #{__FILE__}"
  describe 'is not valid' do
    let!(:valid_section) { create :section }
    let!(:section) { build :section }
    let!(:other_section) { build :section }

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
      other_section.course_id = section.course_id
      other_section.position = section.position
      expect(section.valid?).to be false
    end
  end
end

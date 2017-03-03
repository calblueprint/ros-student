# == Schema Information
#
# Table name: courses
#
#  id           :integer          not null, primary key
#  name         :string           default("Course Name")
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  description  :string           default("This is a course description.")
#  is_published :boolean          default(FALSE)
#

require 'rails_helper'

describe Course, type: :model do
  let!(:published_course) { create :course_with_sections, is_published: true }

  context 'when invalid' do
    let!(:invalid_course) { build :course }

    it 'has no name' do
      invalid_course.name = nil
      expect(invalid_course.valid?).to be false
    end

    it 'has no description' do
      invalid_course.description = nil
      expect(invalid_course.valid?).to be false
    end
  end

  describe '#is_enrolled?' do
    # let!(:enrolled_student)
  end
end

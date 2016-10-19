# == Schema Information
#
# Table name: courses
#
#  id          :integer          not null, primary key
#  name        :string           default("Course Name")
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  description :string           default("This is a course description.")
#

require 'rails_helper'

RSpec.describe Course, type: :model do
  describe 'is invalid' do
    let!(:course) { build :course }

    it 'has no name' do
      course.name = nil
      expect(course.valid?).to be false
    end

    it 'has no description' do
      course.description = nil
      expect(course.valid?).to be false
    end
    
  end
end

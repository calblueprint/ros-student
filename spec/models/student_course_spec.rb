# == Schema Information
#
# Table name: student_courses
#
#  id         :integer          not null, primary key
#  course_id  :integer
#  student_id :integer
#  started    :boolean          default(TRUE)
#  self_paced :boolean
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

RSpec.describe StudentCourse, type: :model do
  describe 'is invalid' do
    let!(:student_course) { build :student_course }

    it 'has no course_id' do
      student_course.course_id = nil
      expect(student_course.valid?).to be false
    end

    it 'has no student_id' do
      student_course.student_id = nil
      expect(student_course.valid?).to be false
    end
    
  end
end

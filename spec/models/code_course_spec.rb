# == Schema Information
#
# Table name: code_courses
#
#  id         :integer          not null, primary key
#  code_id    :integer
#  course_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

RSpec.describe CodeCourse, type: :model do
  describe 'is invalid' do
    let!(:code_course) { build :code_course }

    it 'has no code_id' do
      code_course.code_id = nil
      expect(code_course.valid?).to be false
    end

    it 'has no course_id' do
      code_course.course_id = nil
      expect(code_course.valid?).to be false
    end
    
  end
end

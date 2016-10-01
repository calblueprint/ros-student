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
  pending "add some examples to (or delete) #{__FILE__}"
end

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

class StudentCourse < ActiveRecord::Base
  validates :course_id, :student_id, presence: true
end

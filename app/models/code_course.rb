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

class CodeCourse < ActiveRecord::Base
  validates :code_id, :course_id, presence: true
end

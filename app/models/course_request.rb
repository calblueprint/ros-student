# == Schema Information
#
# Table name: course_requests
#
#  id         :integer          not null, primary key
#  request_id :integer
#  course_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class CourseRequest < ActiveRecord::Base
  validates :course_id, presence: true

  belongs_to :request
  belongs_to :course
end

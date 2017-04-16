class RequestListSerializer < BaseRequestSerializer
  has_many :course_requests
  has_many :courses, through: :course_requests

  has_one :student
end

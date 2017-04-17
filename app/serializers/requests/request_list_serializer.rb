class RequestListSerializer < BaseRequestSerializer
  attributes :id, :state, :is_complete
  has_many :course_requests
  has_many :courses, through: :course_requests

  has_one :student

  def is_complete
    object.state != 0
  end
end

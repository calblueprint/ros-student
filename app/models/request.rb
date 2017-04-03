# == Schema Information
#
# Table name: requests
#
#  id         :integer          not null, primary key
#  student_id :integer
#  state      :integer          default(0)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Request < ActiveRecord::Base
  validates :student_id, presence: true

  has_many :course_requests

  belongs_to :student

  enum states: [:incomplete, :rejected, :accepted]

  def generate_request(params)
    begin
      course_ids = ActiveSupport::JSON.decode(params[:course_ids])
    rescue => e
      course_ids = []
    end
    generated_course_requests = course_ids.map { |course_id| course_requests.create(course_id: course_id) }
  end

  def change_state(state)
    state = 1
  end
end

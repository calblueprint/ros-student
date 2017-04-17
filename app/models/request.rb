# == Schema Information
#
# Table name: requests
#
#  id         :integer          not null, primary key
#  student_id :integer
#  state      :integer          default(0)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  message    :string
#

class Request < ActiveRecord::Base
  has_many :course_requests
  has_many :courses, through: :course_requests

  belongs_to :student

  enum state: [:incomplete, :rejected, :accepted]
<<<<<<< HEAD
  scope :by_state, -> state { where(:state => state) }
=======
>>>>>>> added functionality so that if the course request was accepted, student is automatically enrolled in that course

  def generate_request(params)
    begin
      course_ids = ActiveSupport::JSON.decode(params[:course_ids])
    rescue => e
      course_ids = []
    end

    generated_course_requests = course_ids.map do |course_id|
      course_requests.create(course_id: course_id)
    end
  end

  def send_email
    AdminMailer.send_request(student, self).deliver_now
  end
end

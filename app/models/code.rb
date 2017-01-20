# == Schema Information
#
# Table name: codes
#
#  id          :integer          not null, primary key
#  key         :string
#  student_id  :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  code_csv_id :integer
#

class Code < ActiveRecord::Base
  validates :key, presence: true, uniqueness: true

  belongs_to :student
  belongs_to :code_csv

  has_many :code_courses
  has_many :courses, through: :code_courses

  def self.verify(params)
    code = find_by(key: params[:key])
    code if code && !code.student_id
  end

  # Generates authentication token unless same token already exists in db
  def self.generate_auth_token
    loop do
      token = Devise.friendly_token(8)
      return token unless Code.find_by(key: token)
    end
  end

  # Assigns this code to every course that it is valid for
  def assign_to_courses(course_ids)
    course_ids.each { |course_id| code_courses.create(course_id: course_id) }
  end
end

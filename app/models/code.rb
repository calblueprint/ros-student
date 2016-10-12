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
  validates :key, presence: true
  validates :key, uniqueness: true

  belongs_to :student
  belongs_to :code_csv

  has_many :code_courses
  has_many :courses, through: :code_courses

  def self.verify(params)
    code = find_by(key: params[:key])
    code if code && code.student_id
  end
end

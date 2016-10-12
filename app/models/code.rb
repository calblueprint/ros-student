# == Schema Information
#
# Table name: codes
#
#  id         :integer          not null, primary key
#  key        :string
#  student_id :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Code < ActiveRecord::Base
  validates :key, presence: true
  validates :key, uniqueness: true

  belongs_to :student

  has_many :code_courses
  has_many :courses, through: :code_courses

  def self.verify(params)
    find_by(key: params[:key])
  end
end

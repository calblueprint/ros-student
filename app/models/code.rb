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
  validates :key, :student_id, presence: true
  validates :key, uniqueness: true

  belongs_to :student
end

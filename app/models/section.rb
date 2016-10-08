# == Schema Information
#
# Table name: sections
#
#  id         :integer          not null, primary key
#  title      :string
#  course_id  :integer
#  position   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Section < ActiveRecord::Base
  validates :title, presence: true
  validates :course_id, presence: true
  validates :position, presence: true

  validates :course_id, uniqueness: true
  validates :position, uniqueness: true

  has_many :subsections

  belongs_to :course
end

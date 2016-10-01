# == Schema Information
#
# Table name: subsection_progresses
#
#  id            :integer          not null, primary key
#  student_id    :integer
#  subsection_id :integer
#  completed     :boolean
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class SubsectionProgress < ActiveRecord::Base
  validates :student_id, presence: true
  validates :subsection_id, presence: true
end

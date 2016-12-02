# == Schema Information
#
# Table name: subsection_progresses
#
#  id            :integer          not null, primary key
#  student_id    :integer
#  subsection_id :integer
#  completed     :boolean          default(TRUE)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class SubsectionProgress < ActiveRecord::Base
  validates :student_id, presence: true
  validates :subsection_id, presence: true

  belongs_to :student
  belongs_to :subsection
end

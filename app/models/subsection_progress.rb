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
  after_initialize :set_defaults, unless: :persisted?

  def set_defaults
    self.completed = true if self.bool_field.nil?
  end

  validates :student_id, presence: true
  validates :subsection_id, presence: true
end

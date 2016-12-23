# == Schema Information
#
# Table name: component_progresses
#
#  id           :integer          not null, primary key
#  student_id   :integer
#  completed    :boolean          default(TRUE)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  component_id :integer
#

class ComponentProgress < ActiveRecord::Base
  validates :student_id, presence: true
  validates :component_id, presence: true

  belongs_to :student
  belongs_to :component
end

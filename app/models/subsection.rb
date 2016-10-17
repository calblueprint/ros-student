# == Schema Information
#
# Table name: subsections
#
#  id         :integer          not null, primary key
#  title      :string
#  section_id :integer
#  position   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Subsection < ActiveRecord::Base
  validates :title, presence: true
  validates :section_id, presence: true
  validates :position, presence: true

  validates :position, uniqueness: { scope: :section_id }

  belongs_to :section

  has_many :components

  def is_complete?(user)
    subsection_progress = SubsectionProgress.find_by({ student_id: user.id, subsection_id: id })
    subsection_progress.blank? ? false : subsection_progress.completed
  end
end

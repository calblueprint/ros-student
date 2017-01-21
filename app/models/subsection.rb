# == Schema Information
#
# Table name: subsections
#
#  id         :integer          not null, primary key
#  title      :string           default("Subsection")
#  section_id :integer
#  position   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Subsection < ActiveRecord::Base
  validates :title, presence: true
  # validates :section_id, presence: true

  belongs_to :section
  acts_as_list scope: :section

  has_many :components, -> { order(position: :asc) }

  def is_complete?(user)
    components.all? { |component| component.is_complete?(user) }
  end

  def current_component(user)
    components.find { |component| !component.is_complete?(user) }
  end

  def switch(params)
    new_position = params[:position].presence.to_i || -1
    return false if new_position >= section.subsections.size or new_position <= 0
    insert_at(new_position)
    true
  end
end

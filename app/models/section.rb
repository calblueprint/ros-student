# == Schema Information
#
# Table name: sections
#
#  id         :integer          not null, primary key
#  title      :string           default("Section")
#  course_id  :integer
#  position   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Section < ActiveRecord::Base
  validates :title, presence: true
  # validates :course_id, presence: true

  has_many :subsections, -> { order(position: :asc) }
  belongs_to :course
  acts_as_list scope: :course

  def progress(user)
    total_components = 0.0
    completed_components = 0.0

    subsections.map(&:components)
               .flatten.each do |component|
      total_components += 1
      completed_components += 1 if component.is_complete?(user)
    end

    return total_components == 0 ?
      0 : (completed_components / total_components * 100).round
  end

  def switch(params)
    new_position = params[:position].presence.to_i || -1
    return false if new_position > course.sections.size or new_position <= 0
    insert_at(new_position)
    true
  end
end

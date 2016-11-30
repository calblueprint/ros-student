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
    n = 0.0
    completed = 0.0

    subsections.each do |subsection|
      n = n + 1
      if subsection.is_complete?(user)
        completed = completed + 1
      end
    end

    return completed / n * 100
  end

  def switch(params)
    new_position = params[:position].presence || position
    return false if new_position >= course.sections.size or new_position < 0
    insert_at(new_position)
    true
  end
end

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

  validates :position, uniqueness: { scope: :course_id }

  has_many :subsections
  belongs_to :course

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
end

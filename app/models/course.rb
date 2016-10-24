# == Schema Information
#
# Table name: courses
#
#  id          :integer          not null, primary key
#  name        :string           default("Course Name")
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  description :string           default("This is a course description.")
#

class Course < ActiveRecord::Base
  validates :name, :description, presence: true

  has_many :sections, -> { order(position: :asc) }
  has_many :code_courses
  has_many :codes, through: :code_courses

  def is_enrolled?(user)
    StudentCourse.find_by({ course_id: id, student_id: user.id})
  end

  def current_subsection(user)
    sections.each do |section|
      section.subsections.each do |subsection|
        if !subsection.is_complete?(user)
          return subsection
        end
      end
    end
  end
end

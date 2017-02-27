# == Schema Information
#
# Table name: courses
#
#  id           :integer          not null, primary key
#  name         :string           default("Course Name")
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  description  :string           default("This is a course description.")
#  is_published :boolean          default(FALSE)
#

class Course < ActiveRecord::Base
  validates :name, :description, presence: true

  has_many :sections, -> { order(position: :asc) }
  has_many :code_courses
  has_many :codes, through: :code_courses

  has_one :photo, as: :parent, dependent: :destroy
  accepts_nested_attributes_for :photo

  scope :is_published, -> { where(:is_published => true) }

  def is_enrolled?(user)
    user.instance_of?(Admin) ||
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

    sections.last.subsections.last
  end

  def progress(user)
    completed = 0.0

    sections.each do |section|
      section_progress = section.progress(user)
      completed += 1 if section_progress >= 100
    end

    if sections.size == 0
      return 0
    end

    return (completed / sections.size * 100).round
  end
end

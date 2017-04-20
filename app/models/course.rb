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

  has_many :course_requests
  has_many :requests, through: :course_requests

  has_one :photo, as: :parent, dependent: :destroy
  accepts_nested_attributes_for :photo

  scope :is_published, -> { where(:is_published => true) }

  def is_enrolled?(user)
    user.instance_of?(Admin) ||
    StudentCourse.find_by({ course_id: id, student_id: user.id})
  end

  def is_self_paced?(user)
    StudentCourse.find_by({ course_id: id, student_id: user.id, self_paced: true })
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
    total_components = 0.0
    completed_components = 0.0

    sections.map(&:subsections)
            .flatten
            .map(&:components)
            .flatten.each do |component|
      total_components += 1

      completed_components += 1 if component.is_complete?(user)
    end

    puts completed_components
    puts total_components
    return total_components == 0 ?
      0 : (completed_components / total_components * 100).round
  end
end

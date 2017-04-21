class StudentAbility
  include CanCan::Ability

  def initialize(student)
    student ||= Student.new

    can [
      :index,
      :show,
      :create,
      :update,
      :destroy,
    ], Student, id: student.id

    can [:add_courses], Code
    can [:index], Course
    can [:show], Subsection
    can [:show], Component
    can [:show, :create], ComponentProgress
    can [:show, :update], StudentCourse
    can [:show, :outline, :sidebar], Course do |course|
      course.is_enrolled?(student) && course.is_published
    end
    can [:create], Request
  end
end

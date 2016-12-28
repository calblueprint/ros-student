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

    can [:index], Course
    can [:show], Subsection
    can [:show], Component
    can [:show, :create], ComponentProgress
    can [:show, :outline, :sidebar], Course do |course|
      course.is_enrolled?(student) && course.is_published
    end
  end
end

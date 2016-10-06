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
  end
end

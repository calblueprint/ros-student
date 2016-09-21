class StudentAbility
  include CanCan::Ability

  def initialize(user)
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

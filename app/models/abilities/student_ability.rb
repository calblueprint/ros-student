class StudentAbility
  include CanCan::Ability

  def initialize(student)
    puts 'asdfsfdasadffsadasdfasdfasdfdf'
    student ||= Student.new

    can [
      :index,
      :show,
      :create,
      :update,
      :destroy,
    ], Student, id: student.id

    can :show, Course do |course|
      puts 'asfkasflkasdflkajsfhkjlsfhljasdf'
      course.is_enrolled
    end
  end
end

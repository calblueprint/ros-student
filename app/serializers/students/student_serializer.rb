class StudentSerializer < BaseStudentSerializer
  has_many :courses, each_serializer: CourseStudentListSerializer

  def courses
    object.courses.map do |course|
      CourseStudentListSerializer.new(course, scope: scope, root: false, event: object)
    end
  end
end

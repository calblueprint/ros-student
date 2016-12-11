class CourseStudentListSerializer < BaseCourseSerializer
  attributes :progress, :is_enrolled

  def progress
    object.progress(serialization_options[:user])
  end

  def is_enrolled
    object.is_enrolled?(serialization_options[:user]) ? true : false
  end
end

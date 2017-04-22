class CourseStudentListSerializer < BaseCourseSerializer
  attributes :progress, :is_enrolled, :image_url
  def progress
    object.progress(serialization_options[:user])
  end

  def is_enrolled
    object.is_enrolled?(serialization_options[:user]) ? true : false
  end

  def image_url
    object.photo.thumbnail if object.photo
  end
end

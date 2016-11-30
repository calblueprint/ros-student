class CourseOutlineSerializer < BaseCourseSerializer
  attributes :progress, :is_enrolled

  has_many :sections, each_serializer: SectionOutlineSerializer

  def progress
    object.progress(serialization_options[:user])
  end

  def is_enrolled
    user = serialization_options[:user].presence
    user && object.is_enrolled?(user) ? true : false
  end
end

class CourseEditSerializer < BaseCourseSerializer
  has_many :sections, each_serializer: SectionEditSerializer
end

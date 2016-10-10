class CourseSerializer < BaseCourseSerializer
  has_many :sections, each_serializer: SectionSerializer
end

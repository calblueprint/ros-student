class CourseSerializer < BaseCourseSerializer
  has_many :sections, serializer: SectionSerializer
end

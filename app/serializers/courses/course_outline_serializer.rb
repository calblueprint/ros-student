class CourseOutlineSerializer < BaseCourseSerializer
  has_many :sections, each_serializer: SectionOutlineSerializer
end

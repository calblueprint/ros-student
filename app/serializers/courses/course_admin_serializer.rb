class CourseAdminSerializer < BaseCourseSerializer
  has_many :sections, each_serializer: SectionAdminSerializer
end

class CourseStudentSerializer < BaseCourseSerializer
  has_many :sections, each_serializer: SectionStudentSerializer
end

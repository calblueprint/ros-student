class SectionSerializer < BaseCourseSerializer
  has_many :subsections, serializer: SubsectionSerializer
end

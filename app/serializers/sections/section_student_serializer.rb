class SectionStudentSerializer < BaseSectionSerializer
  has_many :subsections, each_serializer: SubsectionStudentSerializer
end

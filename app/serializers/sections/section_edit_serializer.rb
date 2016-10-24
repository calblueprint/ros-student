class SectionEditSerializer < BaseSectionSerializer
  has_many :subsections, each_serializer: SubsectionEditSerializer
end

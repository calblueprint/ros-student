class SectionSerializer < BaseSectionSerializer
  has_many :subsections, each_serializer: SubsectionSerializer
end

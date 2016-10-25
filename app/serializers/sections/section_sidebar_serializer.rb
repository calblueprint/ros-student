class SectionSidebarSerializer < BaseSectionSerializer
  has_many :subsections, each_serializer: SubsectionSidebarSerializer
end

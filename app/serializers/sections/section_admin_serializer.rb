class SectionAdminSerializer < BaseSectionSerializer
  has_many :subsections, each_serializer: SubsectionAdminSerializer
end

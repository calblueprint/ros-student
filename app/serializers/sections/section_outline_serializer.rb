class SectionOutlineSerializer < ActiveModel::Serializer
  attributes :id,
             :title

  has_many :subsections, each_serializer: SubsectionOutlineSerializer
end

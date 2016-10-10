class CourseOutlineSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :description

  has_many :sections, each_serializer: SectionOutlineSerializer
end

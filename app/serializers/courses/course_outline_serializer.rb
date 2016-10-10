class CourseOutlineSerializer < ActiveModel::Serializer
  attributes :id,
             :name

  has_many :sections, each_serializer: SectionOutlineSerializer
end

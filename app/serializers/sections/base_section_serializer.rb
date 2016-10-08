class BaseSectionSerializer < ActiveModel::Serializer
  attributes :id,
             :title,
             :course_id,
             :position
end

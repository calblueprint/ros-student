class BaseSubsectionSerializer < ActiveModel::Serializer
  attributes :id,
             :title,
             :section_id,
             :position
end

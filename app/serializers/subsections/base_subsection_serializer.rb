class BaseSubsectionSerializer < ActiveModel::Serializer
  attributes :id,
             :title,
             :subsection_id,
             :position
end

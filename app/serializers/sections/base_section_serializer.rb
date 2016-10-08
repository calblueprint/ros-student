class BaseSectionSerializer < ActiveModel::Serializer
  attributes :id,
             :title,
             :module_id,
             :position
end

class FormErrorSerializer < ActiveModel::Serializer
  attributes :key,
             :message
end

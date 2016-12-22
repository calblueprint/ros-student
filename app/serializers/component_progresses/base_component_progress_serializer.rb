class BaseComponentProgressSerializer < ActiveModel::Serializer
  attributes :id,
             :student_id,
             :component_id,
             :completed
end

class BaseRequestSerializer < ActiveModel::Serializer
  attributes :id, :student_id, :state, :created_at
end

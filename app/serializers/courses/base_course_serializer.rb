class BaseCourseSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :description
end

class BaseCourseSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :description,
             :is_enrolled

  def is_enrolled
    user = serialization_options[:user].presence
    user && object.is_enrolled?(user) ? true : false
  end
end

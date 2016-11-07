class BaseCourseSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :description,
             :is_enrolled
             :image_url
  has_one :photo, serializer: PhotoSerializer

  def is_enrolled
    user = serialization_options[:user].presence
    user && object.is_enrolled?(user) ? true : false
  end

  def image_url
    course.photo.image_url
  end
end

class BaseCourseSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :description,
             :is_enrolled,
             :image_url,
             :progress

  def is_enrolled
    user = serialization_options[:user].presence
    user && object.is_enrolled?(user) ? true : false
  end

  def image_url
    object.photo.url if object.photo
  end

  def progress
    object.progress(serialization_options[:user])
  end
end

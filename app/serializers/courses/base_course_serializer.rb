class BaseCourseSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :description,
             :image_url

  has_one :photo, serializer: PhotoSerializer

  def image_url
    object.photo.url if object.photo
  end
end

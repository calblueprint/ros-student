class BaseCourseSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :description,
             :image_url

  def image_url
    object.photo.url if object.photo
  end
end

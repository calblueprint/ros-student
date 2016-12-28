class BaseCourseSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :description,
             :image_url,
             :is_published,

  def image_url
    object.photo.url if object.photo
  end
end

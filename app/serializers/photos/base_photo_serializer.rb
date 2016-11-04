class BasePhotoSerializer < ActiveModel::Serializer
  attributes :id,
             :image_url
end

class BaseComponentSerializer < ActiveModel::Serializer
  attributes  :id,
              :component_type,
              :audio_url,
              :content_url,
              :position,
              :subsection_id

  has_one :photo, serializer: PhotoSerializer

  def component_type
    object[:component_type]
  end
end

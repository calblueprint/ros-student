class BaseComponentSerializer < ActiveModel::Serializer
  attributes  :id,
              :component_type,
              :title,
              :form_key,
              :audio_url,
              :content_url,
              :position,
              :subsection_id

  def content_url
    object.photo ? object.photo.url : object.content_url
  end

  def audio_url
    object.audio ? object.audio.url : nil
  end

  def component_type
    object[:component_type]
  end
end

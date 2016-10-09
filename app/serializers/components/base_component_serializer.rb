class BaseComponentSerializer < ActiveModel::Serializer
  attributes  :id,
              :component_type,
              :audio_url,
              :content_url,
              :position,
              :subsection_id
end

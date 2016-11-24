class BaseSubsectionSerializer < ActiveModel::Serializer
  attributes :id,
             :title,
             :section_id,
             :position,
             :is_complete

  def is_complete
   object.is_complete?(serialization_options[:user])
  end
end

class SubsectionOutlineSerializer < ActiveModel::Serializer
  attributes :id,
             :title,
             :is_complete

  def is_complete
    object.is_complete?(serialization_options[:user])
  end
end

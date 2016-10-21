class SectionOutlineSerializer < ActiveModel::Serializer
  attributes :id,
             :title,
             :progress

  has_many :subsections, each_serializer: SubsectionOutlineSerializer

  def progress
    object.progress(serialization_options[:user])
  end
end

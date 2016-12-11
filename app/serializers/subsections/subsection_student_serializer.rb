class SubsectionStudentSerializer < BaseSubsectionSerializer
  attributes :is_complete

  has_many :components, each_serializer: ComponentStudentSerializer

  def is_complete
    object.is_complete?(serialization_options[:user])
  end
end

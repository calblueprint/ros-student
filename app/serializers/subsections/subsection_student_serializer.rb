class SubsectionStudentSerializer < BaseSubsectionSerializer
  attributes :is_complete

  has_many :components, each_serializer: ComponentStudentSerializer
  has_one :current_component, serializer: ComponentStudentSerializer

  def is_complete
    object.is_complete?(serialization_options[:user])
  end

  def current_component
    object.current_component(serialization_options[:user])
  end
end

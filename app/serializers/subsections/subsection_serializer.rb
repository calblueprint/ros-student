class SubsectionSerializer < BaseSubsectionSerializer
  has_many :components, each_serializer: ComponentSerializer
end

class SubsectionAdminSerializer < BaseSubsectionSerializer
  has_many :components, each_serializer: ComponentAdminSerializer
end

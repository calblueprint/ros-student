class CourseSidebarSerializer < BaseCourseSerializer
  attributes :self_paced

  has_many :sections, each_serializer: SectionSidebarSerializer
  has_one :current_subsection, serializer: SubsectionSidebarSerializer

  def current_subsection
    object.current_subsection(serialization_options[:user])
  end

  def self_paced
    object.is_self_paced?(serialization_options[:user]) ? true : false
  end
end

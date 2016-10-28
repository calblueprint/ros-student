class CourseSidebarSerializer < BaseCourseSerializer
  has_many :sections, each_serializer: SectionSidebarSerializer
  has_one :current_subsection, serializer: SubsectionSidebarSerializer

  def current_subsection
    object.current_subsection(serialization_options[:user])
  end
end

class ImportCourse
  attr_accessor :course

  def initialize(course)
    @course = JSON.parse(course.fetch(:file, '')).fetch('course', '')
  end

  def import_course
    course = Course.new(course_params)
    return false unless course.valid?

    sections = course_params.fetch('sections', [])
    sections.map { |section| import_section(course, section) }

    course.save
  end

  def import_section(course, section)
    section = course.sections.build section_params(section)
    return false unless section.valid?

    subsections = section_params(section).fetch('subsections', [])
    subsections.map { |subsection| import_subsection(section, subsection) }
  end

  def import_subsection(section, subsection)
    subsection = section.subsections.build subsection_params(subsection)
    return false unless subsection.valid?

    components = subsection_params(subsection).fetch('components', [])
    components.map { |component| import_component(subsection, component) }
  end

  def import_component(subsection, component)
    component = subsection.components.build component_params(component)
    return false unless component.valid?
  end

  private

  def course_params
    @course.slice('name', 'description', 'sections')
  end

  def section_params(section)
    section.slice('title', 'subsections')
  end

  def subsection_params(subsection)
    subsection.slice('title', 'components')
  end

  def component_params(component)
    component.slice('component_type', 'audio', 'title', 'content_url', 'image_url')
  end
end

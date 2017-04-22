class ImportCourse
  attr_accessor :course

  def initialize(course)
    @course = JSON.parse(course.fetch(:file, ''))
  end

  def import_course
    course = Course.new(course_params)
    return false unless course.valid?

    sections = @course.fetch('sections', [])
    sections.map { |section| import_section(course, section) }

    course.save
  end

  def import_section(course, section_json)
    section = course.sections.build section_params(section_json)
    return false unless section.valid?

    subsections = section_json.fetch('subsections', [])
    subsections.map { |subsection| import_subsection(section, subsection) }
  end

  def import_subsection(section, subsection_json)
    subsection = section.subsections.build subsection_params(subsection_json)
    return false unless subsection.valid?

    components = subsection_json.fetch('components', [])
    components.map { |component| import_component(subsection, component) }
  end

  def import_component(subsection, component_json)
    component = subsection.components.build component_params(component_json)
    component.valid?
  end

  private

  def course_params
    params = @course.slice('name', 'description', 'image_url')
    add_photo(params, 'image_url')
  end

  def section_params(section_json)
    section_json.slice('title')
  end

  def subsection_params(subsection_json)
    subsection_json.slice('title')
  end

  def component_params(component)
    params = component.slice('component_type', 'audio_url', 'title', 'content_url', 'form_key')
    component_type = params.fetch('component_type', 3)

    add_photo(params, 'content_url') if component_type == Component.component_types[:slide]

    add_audio(params, 'audio_url')
  end

  def add_photo(params, image_url_field)
    image_url = params.fetch(image_url_field, nil)

    params.delete(image_url_field)
    return params unless image_url

    params['photo_attributes'] = {}
    params['photo_attributes']['remote_image_url'] = image_url
    params
  end

  def add_audio(params, audio_url_field)
    audio_url = params.fetch(audio_url_field, nil)
    params.delete(audio_url_field)
    return params unless audio_url
    params['remote_audio_url'] = audio_url
    params
  end
end

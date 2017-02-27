require_relative 'schema_helpers'
require_relative 'component_schemas'

# Subsection serializer
BASE_SUBSECTION_SERIALIZER = {
  type: OBJECT,
  required: ['id', 'title', 'section_id', 'position'],
  properties: {
    id: { type: INTEGER },
    title: { type: STRING },
    course_id: { type: INTEGER },
    position: { type: INTEGER },
  }
}

SUBSECTION_ADMIN_SERIALIZER = {
  type: OBJECT,
  required: ['id', 'title', 'section_id', 'position'],
  properties: {
    id: { type: INTEGER },
    title: { type: STRING },
    course_id: { type: INTEGER },
    position: { type: INTEGER },
  }
}

SUBSECTION_STUDENT_SERIALIZER = {
  type: OBJECT,
  required: ['id', 'title', 'section_id', 'position', 'is_complete', 'components'],
  properties: {
    id: { type: INTEGER },
    title: { type: STRING },
    course_id: { type: INTEGER },
    position: { type: INTEGER },
    is_complete: { type: BOOLEAN },
    components: { type: ARRAY, items: COMPONENT_STUDENT_SERIALIZER },
    current_component: COMPONENT_STUDENT_SERIALIZER,
  }
}

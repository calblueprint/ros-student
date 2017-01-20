require_relative 'schema_helpers'

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

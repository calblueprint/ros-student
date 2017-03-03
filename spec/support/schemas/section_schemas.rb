require_relative 'schema_helpers'
require_relative 'subsection_schemas'

# Section serializer
BASE_SECTION_SERIALIZER = {
  type: OBJECT,
  required: ['id', 'title', 'course_id', 'position'],
  properties: {
    id: { type: INTEGER },
    title: { type: STRING },
    course_id: { type: INTEGER },
    position: { type: INTEGER },
  }
}

SECTION_ADMIN_SERIALIZER = extend_schema(
  BASE_SECTION_SERIALIZER,
  ['subsections'],
  { subsections: { type: ARRAY, items: SUBSECTION_ADMIN_SERIALIZER } }
)

SECTION_STUDENT_SERIALIZER = extend_schema(
  BASE_SECTION_SERIALIZER,
  ['subsections'],
  { subsections: { type: ARRAY, items: SUBSECTION_STUDENT_SERIALIZER } }
)

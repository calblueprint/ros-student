require_relative 'schema_helpers'
require_relative 'section_schemas'

# Course Serializers
BASE_COURSE_SERIALIZER = {
  type: OBJECT,
  required: [
    'id',
    'name',
    'description',
    'image_url',
    'is_published'
  ],
  properties: {
    id: { type: INTEGER },
    name: { type: STRING },
    description: { type: STRING },
    image_url: { type: [STRING, NULL], default: EMPTY },
    is_published: { type: BOOLEAN },
  }
}

COURSE_ADMIN_LIST_SERIALIZER = BASE_COURSE_SERIALIZER
COURSE_STUDENT_LIST_SERIALIZER = BASE_COURSE_SERIALIZER

COURSE_STUDENT_SERIALIZER = extend_schema(
  BASE_COURSE_SERIALIZER,
  ['section'],
  { sections: { type: ARRAY, items: SECTION_STUDENT_SERIALIZER }}
)

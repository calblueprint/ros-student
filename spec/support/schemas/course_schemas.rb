require_relative 'schema_helpers'

# Course Serializers
BASE_COURSE_SERIALIZER = {
  type: OBJECT,
  required: ['id', 'name', 'description', 'image_url', 'is_published'],
  properties: {
    id: { type: INTEGER },
    name: { type: STRING },
    description: { type: STRING },
    is_published: { type: BOOLEAN },
    image_url: { type: [STRING, NULL], default: EMPTY },
  }
}

COURSE_ADMIN_LIST_SERIALIZER = BASE_COURSE_SERIALIZER
COURSE_STUDENT_LIST_SERIALIZER = BASE_COURSE_SERIALIZER

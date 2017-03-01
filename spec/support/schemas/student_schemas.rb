require_relative 'schema_helpers'

# Student serializer
BASE_STUDENT_SERIALIZER = {
  type: OBJECT,
  required: ['id',
             'email',
             'username',
             'first_name',
             'last_name'],
  properties: {
    id: { type: INTEGER },
    email: { type: STRING },
    username: { type: STRING },
    first_name: { type: STRING },
    last_name: { type: STRING },
    image_url: { type: [STRING, NULL], default: EMPTY }
  }
}

STUDENT_SERIALIZER = BASE_STUDENT_SERIALIZER
STUDENT_LIST_SERIALIZER = BASE_STUDENT_SERIALIZER

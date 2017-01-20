def validate_result(result_code=200)
  expect(response.response_code).to eq result_code
end

def validate_serializer(response, serializer, list=false)
  JSON::Validator.validate serializer,
                           response,
                           list: list
end

# Basic Serializer Properties
INTEGER = 'integer'
STRING = 'string'
NULL = 'null'
OBJECT = 'object'
EMPTY = ''
BOOLEAN = 'boolean'

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

# Code Serializer
BASE_CODE_SERIALIZER = {
  type: OBJECT,
  required: ['id', 'key'],
  properties: {
    id: { type: INTEGER },
    key: { type: STRING },
  }
}

CODE_SERIALIZER = BASE_CODE_SERIALIZER
CODE_LIST_SERIALIZER = BASE_CODE_SERIALIZER

# Code Csvs Serializer
BASE_CODE_CSVS_SERIALIZER = {
  type: OBJECT,
  required: ['id', 'name'],
  properties: {
    id: { type: INTEGER },
    name: { type: STRING },
  }
}

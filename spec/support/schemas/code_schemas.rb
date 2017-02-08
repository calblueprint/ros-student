require_relative 'schema_helpers'

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

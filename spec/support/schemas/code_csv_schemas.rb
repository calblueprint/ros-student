require_relative 'schema_helpers'

# Code Csvs Serializer
BASE_CODE_CSV_SERIALIZER = {
  type: OBJECT,
  required: ['id', 'name'],
  properties: {
    id: { type: INTEGER },
    name: { type: STRING },
  }
}

CODE_CSV_SERIALIZER = BASE_CODE_CSV_SERIALIZER
CODE_CSV_LIST_SERIALIZER = BASE_CODE_CSV_SERIALIZER

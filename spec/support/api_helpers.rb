def validate_result(result_code=200)
  expect(response.response_code).to eq result_code
end

def validate_serializer(response, serializer, list=false)
  JSON::Validator.validate serializer,
                           response,
                           list: list
end

# Course Serializers
BASE_COURSE_SERIALIZER = {
  type: 'object',
  required: ['id', 'name', 'description', 'image_url'],
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    description: { type: 'string' },
    image_url: { type: ['string', 'null'], default: '' },
  }
}

COURSE_ADMIN_LIST_SERIALIZER = BASE_COURSE_SERIALIZER
COURSE_STUDENT_LIST_SERIALIZER = BASE_COURSE_SERIALIZER

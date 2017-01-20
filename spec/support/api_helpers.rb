def validate_result(result_code=200)
  expect(response.response_code).to eq result_code
end

def validate_serializer(response, serializer, list=false)
  JSON::Validator.validate serializer,
                           response,
                           list: list
end

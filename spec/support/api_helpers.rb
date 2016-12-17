def validate_result(result_code=200)
  expect(response.response_code).to eq result_code
end

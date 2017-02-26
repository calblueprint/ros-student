require 'rails_helper'

describe Api::CodesController, type: :controller do
  describe '#verify' do
    let!(:old_code) { create :code, key: 'correctkey1' }
    let!(:new_code) { create :code, key: 'correctkey2', student_id: nil }

    def validate_error
      validate_result(404)
      parsed_response = JSON.parse(response.body)
      expect(parsed_response['error']['message']).to eq('Invalid Code')
    end

    it 'should return a code if the code is valid' do
      post :verify, code: { key: 'correctkey2' }

      validate_result

      parsed_response = JSON.parse(response.body)
      expect(validate_serializer(parsed_response['code'],
                                 CODE_SERIALIZER)).to be true
    end

    it 'should return an error if the code invalid' do
      post :verify, code: { key: 'correctkey1' }
      validate_error

      post :verify, code: { key: 'incorrectkey1' }
      validate_error
    end
  end
end

# YES THIS PAGE IS 100% NECESSARY WHY YOU ASK
require 'rails_helper'

describe Api::PagesController, type: :controller do
  describe '#.ping' do

    it 'returns ping' do
      get :ping

      validate_result
      parsed_response = JSON.parse(response.body)
      expect(parsed_response['success']['message']).to eq 'ping'
    end
  end
end

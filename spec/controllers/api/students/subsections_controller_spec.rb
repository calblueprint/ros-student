require 'rails_helper'

describe Api::Students::SubsectionsController, type: :controller do
  let!(:student) { create :student }
  let!(:admin)   { create :admin }
  let!(:subsection) { create :subsection_with_components }

  describe '#show' do
    context 'when signed in as student' do

      before(:each) do
        sign_in_student(student)
      end

      it 'returns a subsection' do
        get :show, id: subsection.id

        validate_result
        parsed_response = JSON.parse(response.body)
        expect(validate_serializer(parsed_response,
                                   SUBSECTION_STUDENT_SERIALIZER,
                                   false)).to be true
        expect(parsed_response['components'].size).to be 2
      end
    end

    context 'when not signed in' do
      it 'returns 403' do
        get :show, id: subsection.id

        validate_result(403)
      end
    end

    context 'when signed in as admin' do
      it 'returns 403' do
        sign_in_admin(admin)
        get :show, id: subsection.id
        validate_result(403)
      end
    end
  end
end

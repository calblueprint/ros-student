require 'rails_helper'

describe Api::Admins::SectionsController, type: :controller do
  let!(:admin) { create :admin }

  before(:each) do
    sign_in_admin(admin)
  end

  describe '.create' do
    it 'should create a new section' do
      course = create :course
      post :create, course_id: course.id, section: {}

      validate_result

      parsed_response = JSON.parse(response.body)

      expect(validate_serializer(parsed_response,
                                 SECTION_ADMIN_SERIALIZER,
                                 false)).to be true
    end
  end

  describe '.update' do
    it 'should update a new section' do
      UPDATE = 'update'

      section = create :section
      put :update, id: section.id, section: { title: UPDATE }

      validate_result
      parsed_response = JSON.parse(response.body)

      expect(validate_serializer(parsed_response,
                                 SECTION_ADMIN_SERIALIZER,
                                 false)).to be true
      expect(parsed_response['title']).to eq UPDATE
    end
  end

  describe 'destroy' do
    it 'should delete the section' do
      section = create :section
      expect{delete :destroy, id: section.id}.to change(Section, :count).by -1
    end
  end
end

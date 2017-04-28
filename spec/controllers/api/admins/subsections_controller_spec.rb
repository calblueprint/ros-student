require 'rails_helper'

describe Api::Admins::SubsectionsController, type: :controller do
  let!(:admin) { create :admin }

  before(:each) do
    sign_in_admin(admin)
  end

  describe '.create' do
    it 'should create a new subsection' do
      section = create :section
      post :create, section_id: section.id, subsection: {}

      validate_result

      parsed_response = JSON.parse(response.body)

      expect(validate_serializer(parsed_response,
                                 SUBSECTION_ADMIN_SERIALIZER,
                                 false)).to be true
    end
  end

  describe '.update' do
    it 'should update a new subsection if the title updates' do
      UPDATE = 'update'

      subsection = create :subsection
      put :update, id: subsection.id, subsection: { title: UPDATE }

      validate_result
      parsed_response = JSON.parse(response.body)

      expect(validate_serializer(parsed_response,
                                 SUBSECTION_ADMIN_SERIALIZER,
                                 false)).to be true
      expect(parsed_response['title']).to eq UPDATE
    end

    it 'shouldn\'t update the subsection with empty title' do
      subsection = create :subsection
      put :update, id: subsection.id, subsection: { title: nil }

      validate_result(400)
    end
  end

  describe 'destroy' do
    it 'should delete the subsection' do
      subsection = create :subsection
      expect{ delete :destroy, id: subsection.id }.to change(Subsection, :count).by -1
    end
  end

  describe 'switch_position' do
    before(:each) do
      @subsection1 = create :subsection
      @subsection2 = create :subsection, section_id: @subsection1.section_id
    end

    it 'should switch positions of the subsections' do
      post :switch_position, id: @subsection2.id, subsection: { position: 1 }

      validate_result
      parsed_response = JSON.parse(response.body)

      expect(validate_serializer(parsed_response,
                                 SECTION_ADMIN_SERIALIZER,
                                 false)).to be true
      expect(Subsection.find(@subsection1.id).position).to eq 2
      expect(Subsection.find(@subsection2.id).position).to eq 1
    end

    it 'shouldn\'t switch invalid positions' do
      post :switch_position, id: @subsection2.id, subsection: { position: 0 }

      validate_result(400)

      post :switch_position, id: @subsection2.id, subsection: { position: 3 }

      validate_result(400)
    end
  end
end

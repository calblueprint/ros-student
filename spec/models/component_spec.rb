# == Schema Information
#
# Table name: components
#
#  id             :integer          not null, primary key
#  component_type :integer
#  audio_url      :string
#  content_url    :string
#  position       :integer
#  subsection_id  :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

require 'rails_helper'

RSpec.describe Component, type: :model do
  describe 'should not be valid' do
    describe 'if it has' do
      let!(:component) { build :component }
      let!(:invalid_component) { create :component, position: 2, subsection_id: 1}

      it 'no component type' do
        component.component_type = nil
        expect(component.valid?).to be false
      end

      it 'no content url' do
        component.content_url = nil
        expect(component.valid?).to be false
      end

      it 'no subsection_id' do
        component.subsection_id = nil
        expect(component.valid?).to be false
      end
    end
  end

  describe 'should be valid' do
    describe 'if it has' do
      let!(:valid_component) { create :component, position: 3 }

      it 'all valid fields' do
        expect(valid_component.valid?).to be true
      end

      it 'no audio_url' do
        valid_component.audio_url = nil
        expect(valid_component.valid?).to be true
      end
    end
  end
end

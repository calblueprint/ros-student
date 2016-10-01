# == Schema Information
#
# Table name: codes
#
#  id         :integer          not null, primary key
#  key        :string
#  student_id :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

RSpec.describe Code, type: :model do
  describe 'is invalid' do
    let!(:code) { build :code }
    let!(:invalid_code) { create :code, key: 'some_code' }

    it 'has no key' do
      code.key = nil
      expect(code.valid?).to be false
    end

    it 'has no student_id' do
      code.student_id = nil
      expect(code.valid?).to be false
    end

    it 'key is not unique' do
      code.key = invalid_code.key
      expect(code.valid?).to be false
    end
    
  end
end

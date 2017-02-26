# == Schema Information
#
# Table name: codes
#
#  id          :integer          not null, primary key
#  key         :string
#  student_id  :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  code_csv_id :integer
#

require 'rails_helper'

RSpec.describe Code, type: :model do
  describe 'when invalid' do
    let!(:code) { build :code }
    let!(:invalid_code) { create :code, key: 'some_code' }

    it 'has no key' do
      code.key = nil
      expect(code.valid?).to be false
    end

    it 'key is not unique' do
      code.key = invalid_code.key
      expect(code.valid?).to be false
    end
  end

  describe '.verify' do
    let!(:used_code) { create :code, key: 'some_code' }
    let!(:unused_code) { create :code, key: 'some_other_code', student_id: nil }

    it 'returns false with incorrect key' do
      expect(Code.verify({ key: 'some_wrong_code' })).to be_falsey
    end

    it 'returns false if code is used' do
      expect(Code.verify({ key: 'some_code' })).to be_falsey
    end

    it 'returns true with right key' do
      expect(Code.verify({ key: 'some_other_code' })).to be_truthy
    end
  end

  describe '.generate_auth_token' do
    it 'won\'t generate repeat codes' do
      token = Code.generate_auth_token
      create :code, key: token

      allow(Devise).to receive(:friendly_token).and_return(token, 'random_token')

      second_token = Code.generate_auth_token

      expect(second_token).to eq 'random_token'
    end
  end

  describe '#assign_to_courses' do
    let!(:code) { create :code }

    it 'creates code courses' do
      course_ids = [1,2,3]
      expect{code.assign_to_courses(course_ids)}.to change(CodeCourse, :count).by 3
      expect(CodeCourse.last(3).map(&:course_id)).to eq course_ids
    end
  end
end

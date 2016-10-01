# == Schema Information
#
# Table name: students
#
#  id                     :integer          not null, primary key
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :inet
#  last_sign_in_ip        :inet
#  first_name             :string           default("")
#  last_name              :string           default("")
#  username               :string           default("")
#

require 'rails_helper'

describe Student do
  describe 'is not valid' do
    let!(:valid_student) { create :student }
    let!(:student) { build :student }
    it 'if there is no first_name' do
      student.first_name = nil
      expect(student.valid?).to be false
    end

    it 'if there is no last_name' do
      student.last_name = nil
      expect(student.valid?).to be false
    end

    it 'if there is no username' do
      student.username = nil
      expect(student.valid?).to be false
    end

    it 'if there is no email' do
      student.email = nil
      expect(student.valid?).to be false
    end

    it 'if there is a duplicate username' do
      student.username = valid_student.username
      expect(student.valid?).to be false
    end

    it 'if there is a duplicate email' do
      student.email = valid_student.email
      expect(student.valid?).to be false
    end

    it 'if there is an invalid email' do
      student.email = '12345'
      expect(student.valid?).to be false
      student.email = '12345@789'
      expect(student.valid?).to be false
      student.email = '12345@wow.123'
      expect(student.valid?).to be false
      student.email = ''
      expect(student.valid?).to be false
      student.email = '@cool.com'
      expect(student.valid?).to be false
      student.email = 'email@'
      expect(student.valid?).to be false
    end

    it 'if there is an invalid password' do
      student.password = ''
      expect(student.valid?).to be false
    end
  end
end

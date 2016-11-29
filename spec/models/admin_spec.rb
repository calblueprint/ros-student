# == Schema Information
#
# Table name: admins
#
#  id                     :integer          not null, primary key
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
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  first_name             :string           default("")
#  last_name              :string           default("")
#  username               :string           default("")
#

require 'rails_helper'

describe Admin do
  describe 'is not valid' do
    let!(:valid_admin) { create :admin }
    let!(:admin) { build :admin }

    it 'if there is no first_name' do
      admin.first_name = nil
      expect(admin.valid?).to be false
    end

    it 'if there is no last_name' do
      admin.last_name = nil
      expect(admin.valid?).to be false
    end

    # it 'if there is no username' do
    #   admin.username = nil
    #   expect(admin.valid?).to be false
    # end

    it 'if there is no email' do
      admin.email = nil
      expect(admin.valid?).to be false
    end

    it 'if there is a duplicate username' do
      admin.username = valid_admin.username
      expect(admin.valid?).to be false
    end

    it 'if there is a duplicate email' do
      admin.email = valid_admin.email
      expect(admin.valid?).to be false
    end

    it 'if there is an invalid email' do
      admin.email = '12345'
      expect(admin.valid?).to be false
      admin.email = '12345@789'
      expect(admin.valid?).to be false
      admin.email = '12345@wow.123'
      expect(admin.valid?).to be false
      admin.email = ''
      expect(admin.valid?).to be false
      admin.email = '@cool.com'
      expect(admin.valid?).to be false
      admin.email = 'email@'
      expect(admin.valid?).to be false
    end
  end
end

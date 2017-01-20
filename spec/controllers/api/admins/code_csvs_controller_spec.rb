require 'rails_helper'

describe Api::Admins::CodeCsvsController, type: :controller do
  let!(:admin) { create :admin }

  before(:each) do
    sign_in_admin(admin)
  end

  describe '.create' do

  end
end

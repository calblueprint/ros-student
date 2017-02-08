require 'rails_helper'

describe Api::Admins::ComponentsController, type: :controller do
  let!(:admin) { create :admin }

  before(:each) do
    sign_in_admin(admin)
  end


end

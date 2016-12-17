require 'rails_helper'

describe Admins::CoursesController, type: :controller do
  let!(:admin) { create :admin }

  before(:each) do
    sign_in_admin(admin)
  end

  describe '.create' do
    it 'should create a course even with no name/description' do
      expect{ post :create }.to change(Course, :count).by 1
      expect(response).to redirect_to edit_course_path(Course.last)
      validate_result(302)
    end
  end
end

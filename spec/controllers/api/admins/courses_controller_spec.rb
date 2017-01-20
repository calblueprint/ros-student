require 'rails_helper'

describe Api::Admins::CoursesController, type: :controller do
  let!(:admin) { create :admin }

  before(:each) do
    sign_in_admin(admin)
  end

  describe '.index' do
    it 'should return a list of courses' do
      Course.all.each { |course| course.destroy }
      5.times { create :course }

      get :index

      validate_result

      parsed_response = JSON.parse(response.body)
      expect(validate_serializer(parsed_response['courses'],
                                 COURSE_ADMIN_LIST_SERIALIZER,
                                 true)).to be true
    end
  end

  describe '.edit' do
    it 'should return a list of courses, section, subsections, components' do

    end
  end
end

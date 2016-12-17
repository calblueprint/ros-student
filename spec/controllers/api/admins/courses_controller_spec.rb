require 'rails_helper'

describe Api::Admins::CoursesController, type: :controller do
  describe '.index' do

    before(:each) do
      Course.all.each { |course| course.destroy }
    end

  it 'should return a list of courses' do

  end
end

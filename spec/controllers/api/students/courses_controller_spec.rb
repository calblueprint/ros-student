require 'rails_helper'

describe Api::Students::CoursesController, type: :controller do
  let!(:student) { create :student }

  let!(:published_course) do
    create :course_with_sections, name: 'Published Course', is_published: true
  end

  let!(:unpublished_course) do
    create :course_with_sections, name: 'Unpublished Course', is_published: false
  end

  before(:each) do
    sign_in_student(student)
  end

  describe '#index' do
    it 'should return a list of published courses' do

    end
  end
end

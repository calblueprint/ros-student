require 'rails_helper'

describe Students::CoursesController, type: :controller do

  let!(:course) { create :course }
  let!(:student) { create :student }

  describe '.show' do
    it 'should redirect to root_path if not signed in' do
      get :show, id: course.id

      expect(response).to redirect_to root_path
      validate_result(302)
    end

    it 'should not show course page if user not enrolled in course' do
      sign_in_student(student)

      get :show, id: course.id

      expect(response).to redirect_to dashboard_path
      validate_result(302)
    end

    it 'should not show course page if course isn\'t published' do
      sign_in_student(student)
      create :student_course, student: student, course: course

      get :show, id: course.id

      expect(response).to redirect_to dashboard_path
      validate_result(302)
    end

    it 'should show course page if student is enrolled' do
      sign_in_student(student)

      course_2 = create :course, is_published: true
      create :student_course, student: student, course: course_2

      get :show, id: course_2.id

      validate_result(200)
    end
  end
end

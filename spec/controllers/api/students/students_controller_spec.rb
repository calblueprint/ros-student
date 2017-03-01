require 'rails_helper'

describe Api::Students::StudentsController, type: :controller do
  describe '#update' do
    let!(:student) { create :student, first_name: 'first', password: 'password' }

    before(:each) { sign_in_student(student) }

    it 'should update add/delete photo correctly' do
      expect(student.image_url).to_not be nil

      put :update, id: student.id, student: {
        current_password: 'password',
        photo_attributes: {
          remove_image: true,
        }
      }

      validate_result

      parsed_response = JSON.parse(response.body)
      expect(validate_serializer(parsed_response['student'],
                                 STUDENT_SERIALIZER)).to be true

      put :update, id: student.id, student: {
        current_password: 'password',
        photo_attributes: {
          image_data: 'data:image/png;base64,somegarbageimagedata',
        }
      }

      validate_result
      parsed_response = JSON.parse(response.body)
      expect(validate_serializer(parsed_response['student'],
                                 STUDENT_SERIALIZER)).to be true

      expect(parsed_response['student']['image_url']).to_not be nil
    end

    it 'should return 400 with incorrect password' do
      put :update, id: student.id, student: {
        first_name: 'not_first',
        current_password: 'wrong_password'
      }

      validate_result(400)

      expect(Student.find(student.id).first_name).to eq 'first'
    end
  end
end

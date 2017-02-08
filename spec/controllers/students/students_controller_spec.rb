require 'rails_helper'

def get_student(
  first_name='first', last_name='last',
  username='username', email='testemail@gmail.com',
  password='password')
  return {
    first_name: first_name,
    last_name: last_name,
    username: username,
    email: email,
    password: password,
    password_confirmation: password,
  }
end

def get_code(key='whatever')
  return {
    key: key,
  }
end

describe Students::StudentsController, type: :controller do

  describe 'should return an invalid student' do
    it 'if we don\'t include a code' do
      expect{post :create, student: get_student}.to_not change(Student, :count)
    end

    it 'if we don\'t include a valid code' do
      expect{post :create, student: get_student, code: get_code}.to_not change(Student, :count)
    end
  end

  describe 'should return an valid student' do
    it 'if we include a valid code' do
      code = Code.create key: 'whatever'
      expect{post :create, student: get_student, code: get_code}.to change(Student, :count)
    end
  end
end

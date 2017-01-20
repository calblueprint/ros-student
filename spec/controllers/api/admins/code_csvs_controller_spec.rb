require 'rails_helper'

describe Api::Admins::CodeCsvsController, type: :controller do
  let!(:admin) { create :admin }

  before(:each) do
    sign_in_admin(admin)
  end

  describe '.create' do
    it 'should create a new code_csv' do
      course = Course.create
      expect do
        post :create,
             code_csv: { name: 'some name'},
             code_csv_args: {
               amount: 1,
               course_ids: [course.id].to_s
             }
      end.to change(CodeCsv, :count).by 1

      validate_result

      parsed_response = JSON.parse(response.body)
      expect(validate_serializer(parsed_response['code_csv'],
                                 CODE_CSV_SERIALIZER,
                                 false)).to be true

      code_csv = CodeCsv.last
      codes = code_csv.codes
      expect(codes.size).to eq 1

      code_courses = codes.first.courses

      expect(code_courses.size).to eq 1
      expect(code_courses.first.id).to eq course.id
    end
  end

  describe '.index' do
    it 'should return a list of code csvs' do
      NUMBER = 5
      CodeCsv.all.each { |c| c.destroy }
      NUMBER.times { |_| CodeCsv.create(name: 'CodeCsv') }

      get :index

      parsed_response = JSON.parse(response.body)
      expect(validate_serializer(parsed_response['code_csvs'],
                                 CODE_CSV_LIST_SERIALIZER,
                                 true)).to be true
      expect(parsed_response['code_csvs'].size).to eq NUMBER
    end
  end
end

FactoryGirl.define do
  factory :student_course do
    course_id 1
    student_id 1
    started false
    self_paced false
  end

  factory :code_course do
    code_id 1
    course_id 1
  end

  factory :course do
    name "MyString"
    description 'MyString'
  end

  factory :code do
    key { Devise.friendly_token(length = 8) }
    student_id 1
  end

  factory :student do
    sequence(:email) { |n| "student#{n}@gmail.com" }
    password 'password'
    first_name 'first'
    last_name 'last'
    username 'firstlast'
  end

  factory :admin do
    sequence(:email) { |n| "admin#{n}@gmail.com" }
    password 'password'
    first_name 'first'
    last_name 'last'
    username 'firstlast'
  end
end

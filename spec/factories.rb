FactoryGirl.define do
  factory :component do
    component_type 0
    audio_url 'audio_url_string'
    content_url 'content_url_string'
    position 1
    subsection_id 1
  end
  factory :subsection_progress do
    student_id 1
    subsection_id 1
    completed true
  end
  factory :subsection do
    title 'MyString'
    section_id 1
    position 1
  end
  factory :section do
    title 'MyString'
    module_id 1
    position 1
  end

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
    username { FFaker::Internet.user_name }
  end

  factory :admin do
    sequence(:email) { |n| "admin#{n}@gmail.com" }
    password 'password'
    first_name 'first'
    last_name 'last'
    username { FFaker::Internet.user_name }
  end
end


FactoryGirl.define do
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

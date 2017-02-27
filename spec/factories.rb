FactoryGirl.define do
  factory :photo do
    parent_id 1
    parent_type "MyString"
    image {Rack::Test::UploadedFile.new(Tempfile.new([Devise.friendly_token, 'jpg']))}
  end

  factory :code_csv do
    name "MyString"
  end

  factory :component do
    component_type :slide
    audio_url 'audio_url_string'
    content_url 'content_url_string'
    title 'Title'
    position 1
    subsection

    trait :slide do
      component_type :slide
    end

    trait :form do
      component_type :form
    end

    trait :video do
      component_type :multimedia
    end
  end

  factory :component_progress do
    student
    component
    completed true
  end

  factory :subsection do
    title 'MyString'
    section
    position 1

    factory :subsection_with_components do
      after(:create) do |subsection|
        2.times { create :component, :slide, subsection: subsection }
      end
    end
  end

  factory :section do
    title 'MyString'
    position 1
    course
  end

  factory :student_course do
    started false
    self_paced false
    course
    student
  end

  factory :code_course do
    code
    course
  end

  factory :course do
    name 'MyString'
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
    code
  end

  factory :admin do
    sequence(:email) { |n| "admin#{n}@gmail.com" }
    password 'password'
    first_name 'first'
    last_name 'last'
    username { FFaker::Internet.user_name }
  end
end

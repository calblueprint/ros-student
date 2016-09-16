FactoryGirl.define do
  factory :student do
    sequence(:email) { |n| "student#{n}@gmail.com" }
    password 'password'
  end

  factory :admin do
    sequence(:email) { |n| "admin#{n}@gmail.com" }
    password 'password'
  end
end

  # This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
student = Student.create(first_name: 'First', last_name: 'Last', password: 'password', username:'student', email: 'student@gmail.com')

admin = Admin.create(first_name: 'First', last_name: 'Last', password: 'password', username:'admin', email: 'admin@gmail.com')


def create_student
  puts 'creating students'
  5.times do |n|
    Student.create first_name: "Student#{n}",
                   last_name: 'Last',
                   password: 'password',
                   username: "student#{n}",
                   email: "student#{n}@gmail.com"
  end
end

def create_admin
  puts 'creating admins'
  5.times do |n|
    Admin.create first_name: "Admin#{n}",
                 last_name: 'Last',
                 password: 'password',
                 username: "admin#{n}",
                 email: "admin#{n}@gmail.com"
  end
end

def create_codes
  puts 'create codes'
  5.times do |n|
    Code.create key: Devise.friendly_token(8)
  end
end

def create_courses
  puts 'creating courses'

  courses = 5.times.map do |n|
    Course.create name: FFaker::Music.album,
                  description: FFaker::Lorem.sentence
  end

  sections = courses.map do |course|
    5.times.map do |n|
      course.sections.create title: FFaker::Movie.title
    end
  end.flatten

  subsections = sections.map do |section|
    5.times.map do |n|
      section.subsections.create title: FFaker::CheesyLingo.title
    end
  end.flatten

  subsections.map do |subsection|
    3.times.map do |n|
      subsection.components.create component_type: 0,
                                   content_url: 'https://docs.google.com/presentation/d/1Bi_nOT9xuBrb07dquBM6IZZJ3iTOJmj15adkF3IVqFw/pub?start=false&loop=false&delayms=3000'
    end
  end
end

create_student
create_admin
create_codes
create_courses

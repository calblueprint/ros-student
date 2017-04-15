  # This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
def create_codes
  10.times do |n|
    code = Code.create key: "code#{n}"
    CodeCourse.create code_id: code.id,
                      course_id: Course.first.id
  end
end

def create_student_and_codes
  puts 'creating students'
  5.times do |n|
    student = Student.new first_name: "Student#{n}",
                   last_name: 'Last',
                   password: 'password',
                   username: "student#{n}",
                   email: "student#{n}@gmail.com"

    code = Code.create key: Devise.friendly_token(8)
    CodeCourse.create code_id: code.id, course_id: Course.first.id
    student.codes << code
    student.save
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

def create_courses
  puts 'creating courses'

  courses = 5.times.map do |n|
    Course.create name: FFaker::Music.album,
                  description: FFaker::Lorem.sentence,
                  is_published: true
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
    number = rand(3)
    case number
      when 0
        create_slide_subsection(subsection)
      when 1
        create_form_subsection(subsection)
      when 2
        create_video_subsection(subsection)
    end
  end
end

def create_slide_subsection(subsection)
  10.times do |n|
    component = subsection.components.create component_type: 0,
                                             audio: 'http://www.noiseaddicts.com/samples_1w72b820/272.mp3',
                                             title: FFaker::Education.degree,
                                             remote_audio_url: get_audio_url
    photo = get_photo(component, 'http://image.slidesharecdn.com/slidepresentationguidelines-090612035201-phpapp01/95/slide-presentation-guidelines-1-728.jpg')
    component.photo = photo
    component.save
  end
end

def create_form_subsection(subsection)
  subsection.components.create component_type: 1,
                               content_url: 'https://docs.google.com/forms/d/e/1FAIpQLSdRvdxwyWVVcYwd1Ga6u7nnuBNi3BP6yOSTwGsYlZBsZ5iYag/viewform',
                               title: FFaker::Education.degree,
                               form_key: 'water',
                               remote_audio_url: get_audio_url
end

def create_video_subsection(subsection)
  subsection.components.create component_type: 2,
                               content_url: 'https://www.youtube.com/watch?v=a1Y73sPHKxw',
                               title: FFaker::Education.degree,
                               remote_audio_url: get_audio_url
end

def get_photo(object, image_url)
  Photo.create!(
    parent: object,
    remote_image_url: image_url,
  )
end

def get_audio_url
  'https://ros-staging.s3.amazonaws.com/uploads/component/audio/152/tA74TtoPrkEQ-F8diXHD.mp3'
end

create_courses
create_codes
create_student_and_codes
create_admin

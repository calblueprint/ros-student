# == Schema Information
#
# Table name: students
#
#  id                     :integer          not null, primary key
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :inet
#  last_sign_in_ip        :inet
#  first_name             :string           default("")
#  last_name              :string           default("")
#  username               :string           default("")
#

class Student < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable,
         :recoverable, :rememberable, :trackable, :validatable

  EMAIL_PATTERN = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  validates_confirmation_of :password
  validates :email, format: { with: EMAIL_PATTERN }, uniqueness: true, presence: true
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :username, uniqueness: true, presence: true
  validate :has_code

  has_many :codes

  has_many :student_courses
  has_many :courses, through: :student_courses

  has_many :component_progresses
  has_many :component, through: :component_progresses

  has_one :photo, as: :parent, dependent: :destroy
  accepts_nested_attributes_for :photo

  after_create :subscribe_to_courses

  def image_url
    photo.url if photo
  end

  def subscribe_to_courses
    codes.each do |code|
      code.courses.each do |course|
        student_courses.find_or_create_by(course_id: course.id)
      end
    end
  end

  private

  def has_code
    unless codes && codes.size > 0
      errors.add(:code, 'does not exist')
    end
  end
end

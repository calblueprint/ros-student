# == Schema Information
#
# Table name: admins
#
#  id                     :integer          not null, primary key
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
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  first_name             :string           default("")
#  last_name              :string           default("")
#  username               :string           default("")
#

class Admin < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable,
         :recoverable, :rememberable, :trackable, :validatable

  attr_accessor :temp_password

  EMAIL_PATTERN = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, format: { with: EMAIL_PATTERN }, uniqueness: true, presence: true
  validates :first_name, presence: true
  validates :last_name, presence: true

  validates_confirmation_of :password
  validates :username, presence: true, on: :update
  validates :username, uniqueness: true, allow_blank: true

  has_one :photo, as: :parent, dependent: :destroy
  accepts_nested_attributes_for :photo

  before_validation :generate_password, on: :create
  after_create :send_email

  def image_url
    photo.url if photo
  end

  private

  def generate_password
    @temp_password = Devise.friendly_token(8)
    self.password = @temp_password
    self.password_confirmation = @temp_password
  end

  def send_email
    AdminMailer.create_admin(self, @temp_password).deliver_now
  end
end

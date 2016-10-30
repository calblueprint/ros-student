# == Schema Information
#
# Table name: photos
#
#  id          :integer          not null, primary key
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  parent_id   :integer
#  parent_type :string
#  image       :string
#

class Photo < ActiveRecord::Base
  belongs_to :parent, polymorphic: true

  validates :image, presence: true

  mount_uploader :image, ImageUploader

  def url
    image.url
  end

  def self.convert_base64(data)
    return unless data

    temp_file = Tempfile.new [Devise.friendly_token, "jpg"]
    temp_file.binmode
    temp_file.write(Base64.decode64(data))

    ActionDispatch::Http::UploadedFile.new(tempfile: temp_file, filename: "#{Devise.friendly_token}.jpg")
  end
end

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

  # validates :image, presence: true

  mount_uploader :image, ImageUploader

  after_update :check_empty_image

  def url
    image.url
  end

  def thumbnail
    image.thumb.url if image && image.thumb
  end

  private

  # Remove model if there isn't an image.
  def check_empty_image
    destroy unless image
  end
end

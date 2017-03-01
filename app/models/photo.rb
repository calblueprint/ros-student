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

  def url
    image.url if image
  end
end

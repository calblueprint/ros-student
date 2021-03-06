# == Schema Information
#
# Table name: components
#
#  id             :integer          not null, primary key
#  component_type :integer
#  audio_url      :string
#  content_url    :string
#  position       :integer
#  subsection_id  :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  audio          :string
#  title          :string
#  form_key       :string
#

class Component < ActiveRecord::Base
  enum component_type: [ :slide, :form, :multimedia ]

  validates :component_type, presence: true
  # validates :subsection_id, presence: true
  validates :title, presence: true
  validates :content_url, presence: true, if: :requires_content_url?
  validates :photo, presence: true, if: :requires_image_data?

  has_one :photo, as: :parent, dependent: :destroy
  accepts_nested_attributes_for :photo

  belongs_to :subsection
  acts_as_list scope: :subsection

  mount_uploader :audio, AudioUploader

  def requires_content_url?
    component_type == "form" or component_type == "multimedia"
  end

  def requires_image_data?
    component_type == "slide"
  end

  def is_complete?(user)
    !ComponentProgress.find_by(student_id: user.id, component_id: id).blank?
  end

  def audio_url
    audio.url
  end

  def switch(params)
    new_position = params[:position].presence || position
    return false if new_position > subsection.components.size or new_position < 0
    insert_at(new_position)
    true
  end

  def move_to_position
    insert_at(subsection.components.size)
  end
end

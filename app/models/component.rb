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
#

class Component < ActiveRecord::Base
  enum component_type: [ :slide, :form, :multimedia ]

  validates :component_type, presence: true
  validates :subsection_id, presence: true

  has_one :photo, as: :parent, dependent: :destroy
  accepts_nested_attributes_for :photo

  belongs_to :subsection
  acts_as_list scope: :subsection

  mount_uploader :audio, AudioUploader

  def audio_url
    audio.url
  end

  def switch(params)
    new_position = params[:position].presence || position
    return false if new_position >= subsection.components.size or new_position < 0
    insert_at(new_position)
    true
  end
end

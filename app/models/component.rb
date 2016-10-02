# == Schema Information
#
# Table name: components
#
#  id            :integer          not null, primary key
#  type          :integer
#  audio_url     :string
#  content_url   :string
#  position      :integer
#  subsection_id :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Component < ActiveRecord::Base
  enum type: [ :slide, :form, :multimedia ]

  validates :type, presence: true
  validates :content_url, presence: true
  validates :position, presence: true
  validates :subsection_id, presence: true

  validates :subsection_id, uniqueness: true
  validates :position, uniqueness: true
end

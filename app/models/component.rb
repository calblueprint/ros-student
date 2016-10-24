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
#

class Component < ActiveRecord::Base
  enum component_type: [ :slide, :form, :multimedia ]

  validates :component_type, presence: true
  validates :content_url, presence: true
  validates :subsection_id, presence: true
  validates :position, uniqueness: { scope: :subsection_id }

  belongs_to :subsection
  acts_as_list scope: :subsection

  def switch(params)
    new_position = params[:position].presence || position
    return false if new_position >= subsection.components.size or new_position < 0
    insert_at(new_position)
    true
  end
end

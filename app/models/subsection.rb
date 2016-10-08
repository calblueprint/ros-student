# == Schema Information
#
# Table name: subsections
#
#  id         :integer          not null, primary key
#  title      :string
#  section_id :integer
#  position   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Subsection < ActiveRecord::Base
  validates :title, presence: true
  validates :section_id, presence: true
  validates :position, presence: true

  validates :position, uniqueness: true

  belongs_to :section
  has_many :components
end

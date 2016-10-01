# == Schema Information
#
# Table name: sections
#
#  id         :integer          not null, primary key
#  title      :string
#  module_id  :integer
#  position   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Section < ActiveRecord::Base
  validates :title, presence: true
  validates :module_id, presence: true
  validates :position, presence: true

  validates :module_id, uniqueness: true
  validates :position, uniqueness: true
end

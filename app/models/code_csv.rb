# == Schema Information
#
# Table name: code_csvs
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class CodeCsv < ActiveRecord::Base
  validates :name, presence: true

  has_many :codes
end

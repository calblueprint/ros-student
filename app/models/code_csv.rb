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

  # Takes a name for the csv file, the number of codes, and a list of course ids
  def generate_csv(amount, course_ids)
    codes = amount.times.map { |_| Code.create(key: @code.generate_auth_token) }
    codes.map { |code| code.assign_to_courses(course_ids) }
    keys = codes.map { |code| code.key }
    return keys.to_csv  # Converts array to CSV string
  end

end

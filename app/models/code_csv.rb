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

  # Students should have an authentication token attribute?

  # Takes a name for the csv file, the number of codes, and a list of course ids
  def generate_csv(amount, course_ids)
    codes = []
    for _ in 1..amount
      codes << generate_auth_token
    end
    amount.times.map { |_|   }
    return codes.to_csv  # Converts array to CSV string
  end

end

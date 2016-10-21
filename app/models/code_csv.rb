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
  def generate_codes(params)
    begin
      course_ids = ActiveSupport::JSON.decode(params[:course_ids])
    rescue => e
      course_ids = []
    end

    amount = params[:amount] || 0
    generated_codes = amount.times.map { |_| codes.create(key: Code.generate_auth_token) }
    generated_codes.map { |code| code.assign_to_courses(course_ids) }
    puts params
  end
end

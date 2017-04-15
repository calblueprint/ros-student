# == Schema Information
#
# Table name: code_csvs
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'csv'

class CodeCsv < ActiveRecord::Base
  validates :name, presence: true

  has_many :codes

  # Takes a `params` map with keys :course_ids (list) and :amount (integer)
  def generate_codes(params)
    begin
      course_ids = ActiveSupport::JSON.decode(params[:course_ids])
    rescue => e
      course_ids = []
    end

    amount = params[:amount] || 0
    generated_codes = amount.to_i.times.map { |_| codes.create(
      key: Code.generate_auth_token,
      self_paced: params[:self_paced]
    )}
    generated_codes.map { |code| code.assign_to_courses(course_ids) }
  end

  def to_csv
    CSV.generate(headers: true) do |csv|
      csv << ["key"]
      codes.each do |code|
        csv << [code.key]
      end
    end
  end
end

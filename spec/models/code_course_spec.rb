# == Schema Information
#
# Table name: code_courses
#
#  id         :integer          not null, primary key
#  code_id    :integer
#  course_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

RSpec.describe CodeCourse, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end

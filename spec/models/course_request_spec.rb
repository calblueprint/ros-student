# == Schema Information
#
# Table name: course_requests
#
#  id         :integer          not null, primary key
#  request_id :integer
#  course_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

RSpec.describe CourseRequest, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end

# == Schema Information
#
# Table name: subsection_progresses
#
#  id            :integer          not null, primary key
#  student_id    :integer
#  subsection_id :integer
#  completed     :boolean          default(TRUE)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

require 'rails_helper'

RSpec.describe SubsectionProgress, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end

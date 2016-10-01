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

require 'rails_helper'

RSpec.describe Subsection, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end

# == Schema Information
#
# Table name: photos
#
#  id          :integer          not null, primary key
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  parent_id   :integer
#  parent_type :string
#  image       :string
#

require 'rails_helper'

RSpec.describe Photo, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end

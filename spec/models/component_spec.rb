# == Schema Information
#
# Table name: components
#
#  id            :integer          not null, primary key
#  type          :integer
#  audio_url     :string
#  content_url   :string
#  position      :integer
#  subsection_id :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

require 'rails_helper'

RSpec.describe Component, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end

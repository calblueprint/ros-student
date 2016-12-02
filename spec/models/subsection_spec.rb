# == Schema Information
#
# Table name: subsections
#
#  id         :integer          not null, primary key
#  title      :string           default("Subsection")
#  section_id :integer
#  position   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

RSpec.describe Subsection, type: :model do
  describe 'is not valid because it' do
    let!(:valid_subsection) { create :subsection }
    let!(:subsection) { build :subsection }
    let!(:other_subsection) { create :subsection }

    it 'has no title' do
      subsection.title = nil
      expect(subsection.valid?).to be false
    end

    # it 'has no section id' do
    #   subsection.section_id = nil
    #   expect(subsection.valid?).to be false
    # end
  end
end

class AddAudioToComponents < ActiveRecord::Migration
  def change
    add_column :components, :audio, :string
  end
end

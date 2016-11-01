# encoding: utf-8

class AudioUploader < CarrierWave::Uploader::Base
  include CarrierWave::Audio

  # Override the directory where uploaded files will be stored.
  # This is a sensible default for uploaders that are meant to be mounted:
  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  version :mp3 do
    process :convert => [:mp3]

    def full_filename(for_file)
      "#{super.chomp(File.extname(super))}.mp3"
    end
  end
end

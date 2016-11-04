# encoding: utf-8

class AudioUploader < CarrierWave::Uploader::Base
  # Override the directory where uploaded files will be stored.
  # This is a sensible default for uploaders that are meant to be mounted:
  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def cache_dir
    "#{Rails.root}/public/tmp/uploads"
  end

  def file_storage?
    self.class.storage == CarrierWave::Storage::File
  end

  # version :mp3 do
  #   process :convert => [:mp3]

  #   def full_filename(for_file)
  #     "#{super.chomp(File.extname(super))}.mp3"
  #   end
  # end
end

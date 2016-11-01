class FileUploadUtils

  FILE_FORMATS = {
    'audio/mp3' => 'mp3',
    'image/png' => 'png',
    'image/jpg' => 'jpg',
    'image/jpeg' => 'jpeg',
  }

  def self.convert_base64(data)
    return unless data

    metadata, data = data.split(',')
    _, data_format, _ = metadata.split(/[;:]/)

    extension = FILE_FORMATS[data_format]
    return unless extension

    temp_file = Tempfile.new [Devise.friendly_token, extension]
    temp_file.binmode
    temp_file.write(Base64.decode64(data))

    ActionDispatch::Http::UploadedFile.new(tempfile: temp_file, filename: "#{Devise.friendly_token}.#{extension}")
  end
end

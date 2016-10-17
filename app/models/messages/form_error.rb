class FormError
  include ActiveModel::Model
  include ActiveModel::Serializers::JSON

  attr_reader :key, :message

  def initialize(key, message)
    @key = key
    @message = message.first
  end
end

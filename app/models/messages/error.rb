class Error
  include ActiveModel::Model
  include ActiveModel::Serializers::JSON

  attr_reader :message

  def initialize(object, message = nil)
    @object = object
    @message = message
  end

  def form_errors
    return [] unless @object
    @object.errors.messages.map { |k, v| FormError.new(k,v) }
  end
end

class Error
  include ActiveModel::Model
  include ActiveModel::Serializers::JSON

  attr_reader :message

  def initialize(object, message=nil, form_fields={})
    @object = object
    @message = message
    @form_fields = form_fields
  end

  def form_errors
    return [] unless @object
    @object.errors.messages.map { |k, v| FormError.new(k,v) }
  end

  def form_fields
    @form_fields.map { |k, v| FormField.new(k, v) }
  end
end

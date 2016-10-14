class FormField
  include ActiveModel::Model
  include ActiveModel::Serializers::JSON

  attr_reader :key, :fields

  def initialize(key, fields)
    @key = key
    @fields = fields.as_json
  end
end

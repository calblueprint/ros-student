class Success
  include ActiveModel::Model
  include ActiveModel::Serializers::JSON

  def initialize(message=nil)
    @message = message || "Successful request"
  end

  def message
    @message
  end
end

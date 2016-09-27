class Api::BaseController < ApplicationController

  def unauthorized_response
    error_response(nil, "Unauthorized", 403)
  end

  def not_found_response
    error_response(nil, "Not Found", 404)
  end

  def success_response(message = nil)
    render json: Success.new(message), serializer: SuccessSerializer
  end

  def error_response(object, message = nil, status = nil)
    render json: Error.new(object, message), serializer: ErrorSerializer, status: status || 400
  end
end

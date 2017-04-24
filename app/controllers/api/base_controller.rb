class Api::BaseController < ApplicationController
  protect_from_forgery with: :null_session

  rescue_from CanCan::AccessDenied do |exception|
    unauthorized_response
  end

  rescue_from ActiveRecord::RecordNotFound do |exception|
    not_found_response
  end

  def unauthorized_response
    error_response(nil, "Unauthorized", 403)
  end

  def not_found_response
    error_response(nil, "Not Found", 404)
  end

  def success_response(message = 'Successful request')
    render json: Success.new(message), serializer: SuccessSerializer
  end

  def error_response(object, message = nil, status = nil)
    render json: Error.new(object, message), serializer: ErrorSerializer, status: status || 400
  end

  def current_ability
    @current_ability ||= ::Ability.new(current_user)
  end
end

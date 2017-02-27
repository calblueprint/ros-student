class Api::Admins::BaseController < Api::BaseController
  before_filter :authenticate_admin!

  private

  def current_ability
    @current_ability ||= ::AdminAbility.new(current_admin)
  end

  def authenticate_admin!
    if admin_signed_in?
      super
    else
      unauthorized_response
    end
  end
end

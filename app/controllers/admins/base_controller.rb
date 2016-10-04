class Admins::BaseController < ApplicationController
  before_filter :authenticate_admin!

  private

  def current_ability
    @current_ability ||= ::AdminAbility.new(current_admin)
  end
end

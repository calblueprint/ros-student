class Students::BaseController < ApplicationController
  before_filter :authenticate_student!

  private

  def current_ability
    @current_ability ||= ::StudentAbility.new(current_student)
  end
end

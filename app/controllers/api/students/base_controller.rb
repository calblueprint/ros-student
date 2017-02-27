class Api::Students::BaseController < Api::BaseController
  before_filter :authenticate_student!

  private

  def current_ability
    @current_ability ||= ::StudentAbility.new(current_student)
  end

  def authenticate_student!
    if student_signed_in?
      super
    else
      unauthorized_response
    end
  end
end

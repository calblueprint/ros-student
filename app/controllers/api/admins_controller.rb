class Api::AdminsController < Api::BaseController
  def reset_password
    @admin = Admin.find_by_email(reset_params)
    if @admin.present?
      @admin.send_reset_password_instructions
      success_response('You will receive an email shortly with instructions!')
    else
      error_response(nil, 'This email cannot be found.')
    end
  end

  def reset_params
    params.require(:email)
  end
end

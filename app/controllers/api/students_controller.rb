class Api::StudentsController < Api::BaseController
  def reset_password
    @student = Student.find_by_email(reset_params)
    if @student.present?
      @student.send_reset_password_instructions
      success_response('You will receive an email shortly with instructions!')
    else
      error_response(nil, 'This email cannot be found.')
    end
  end

  def update
    resource = Student.reset_password_by_token(update_params)

    if resource.errors.empty?
      resource.unlock_access! if unlockable?(resource)
      # if Devise.sign_in_after_reset_password
      #   flash_message = resource.active_for_authentication? ? :updated : :updated_not_active
      #   set_flash_message!(:notice, flash_message)
      #   sign_in(resource_name, resource)
      # else
      #   set_flash_message!(:notice, :updated_not_active)
      # end
      # respond_with resource, location: after_resetting_password_path_for(resource)
    else
      set_minimum_password_length
      respond_with resource
    end
  end

  def reset_params
    params.require(:email)
  end

  def update_params
    params.require(:reset_password_token, :password, :passowrd_confirmation)
  end
end

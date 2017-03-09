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

  def update
    self.resource = resource_class.reset_password_by_token(resource_params)
    yield resource if block_given?

    if resource.errors.empty?
      resource.unlock_access! if unlockable?(resource)
      if Devise.sign_in_after_reset_password
        flash_message = resource.active_for_authentication? ? :updated : :updated_not_active
        set_flash_message!(:notice, flash_message)
      else
        set_flash_message!(:notice, :updated_not_active)
      end
    else
      set_minimum_password_length
      respond_with resource
    end
  end

  def reset_params
    params.require(:email)
  end
end

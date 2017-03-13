class Admins::PasswordsController < Devise::PasswordsController
  prepend_before_action :require_no_authentication
  # Render the #edit only if coming from a reset password email link
  append_before_action :assert_reset_token_passed, only: :edit

  # GET /resource/password/new
  def new
    self.resource = resource_class.new
  end

  # POST /resource/password
  def create
    self.resource = resource_class.send_reset_password_instructions(resource_params)
    yield resource if block_given?

    if successfully_sent?(resource)
      respond_with({}, location: after_sending_reset_password_instructions_path_for(resource_name))
    else
      respond_with(resource)
    end
  end

  # GET /resource/password/edit?reset_password_token=abcdef
  def edit
    self.resource = resource_class.new
    set_minimum_password_length
    resource.reset_password_token = params[:reset_password_token]
  end

  # PUT /resource/password
  def update
    @admin = Admin.reset_password_by_token(update_params)
    yield @admin if block_given?

    if @admin.errors.empty?
      @admin.unlock_access! if unlockable?(@admin)
      if Devise.sign_in_after_reset_password
        flash_message = @admin.active_for_authentication? ? 'Your password has been successfully updated!' : :updated_not_active
        flash[:notice] = flash_message
        sign_in(resource_name, @admin)
      else
        flash[:notice] = :updated_not_active
      end
      respond_with @admin, location: after_resetting_password_path_for(@admin)
    else
      set_minimum_password_length
      @error = Error.new(@admin, nil)

      if @admin.errors.keys.include?(:reset_password_token)
        flash[:error] = @admin.errors.full_messages_for(:reset_password_token)
      end
      render 'pages/home'
    end
  end

  protected
    def after_resetting_password_path_for(resource)
      Devise.sign_in_after_reset_password ? after_sign_in_path_for(resource) : new_session_path(resource_name)
    end

    # The path used after sending reset password instructions
    def after_sending_reset_password_instructions_path_for(resource_name)
      new_session_path(resource_name) if is_navigational_format?
    end

    # Check if a reset_password_token is provided in the request
    def assert_reset_token_passed
      if params[:reset_password_token].blank?
        set_flash_message(:alert, :no_token)
        redirect_to new_session_path(resource_name)
      end
    end

    # Check if proper Lockable module methods are present & unlock strategy
    # allows to unlock resource on password reset
    def unlockable?(resource)
      resource.respond_to?(:unlock_access!) &&
        resource.respond_to?(:unlock_strategy_enabled?) &&
        resource.unlock_strategy_enabled?(:email)
    end

    def translation_scope
      'devise.passwords'
    end

  private

  def update_params
    params.require(:admin).permit(
      :password,
      :password_confirmation,
      :reset_password_token,
    )
  end
end

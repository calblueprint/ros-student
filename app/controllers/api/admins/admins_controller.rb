class Api::Admins::AdminsController < Api::Admins::BaseController
  load_and_authorize_resource

  def update
    if @admin.update_with_password(update_params)
      render json: @admin, serializer: AdminSerializer
    else
      error_response(@admin)
    end
  end

  private

  def update_params
    params.require(:admin).permit(:username,
                                  :email,
                                  :first_name,
                                  :last_name,
                                  :password,
                                  :current_password,
                                  :password_confirmation)
  end
end

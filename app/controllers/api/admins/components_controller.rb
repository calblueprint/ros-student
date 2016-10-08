class Api::Admins::ComponentsController < Api::Admins::BaseController
  load_and_authorize_resource

  def update
    if @component.update_with_password(update_params)
      render json: @component, serializer: ComponentSerializer
    else
      error_response(@component)
    end
  end

  private

  def update_params
    params.require(:component).permit(
      :component_type,
      :email,
      :first_name,
      :last_name,
      :password,
      :current_password,
      :password_confirmation
    )
  end
end

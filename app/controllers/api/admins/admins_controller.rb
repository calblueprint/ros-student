class Api::Admins::AdminsController < Api::Admins::BaseController
  load_and_authorize_resource

  prepend_before_filter :convert_image, only: :update

  def index
    render json: @admins, each_serializer: AdminListSerializer, root: false
  end

  def update
    if @admin.update_with_password(update_params)
      render json: @admin, serializer: AdminSerializer
    else
      error_response(@admin)
    end
  end

  private

  def update_params
    params.require(:admin).permit(
      :username,
      :email,
      :first_name,
      :last_name,
      :password,
      :current_password,
      :password_confirmation,
      photo_attributes: [:image],
    )
  end

  def convert_image
    return if params[:admin][:photo_attributes].blank? ||
      params[:admin][:photo_attributes][:image_data].blank?

    image_file = FileUploadUtils.convert_base64(
        params[:admin][:photo_attributes][:image_data])
    return unless image_file

    params[:admin][:photo_attributes][:image] = image_file
    params[:admin][:photo_attributes].delete(:image_data)
  end
end

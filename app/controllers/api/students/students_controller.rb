class Api::Students::StudentsController < Api::Students::BaseController
  load_and_authorize_resource

  prepend_before_filter :convert_audio, only: :update

  def update
    if @student.update_with_password(update_params)
      render json: @student, serializer: StudentSerializer
    else
      error_response(@student)
    end
  end

  private

  def update_params
    params.require(:student).permit(
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
    return if params[:student][:photo_attributes].blank? ||
      params[:student][:photo_attributes][:image_data].blank?

    image_file = FileUploadUtils.convert_base64(
        params[:student][:photo_attributes][:image_data])
    return unless image_file

    params[:student][:photo_attributes][:image] = image_file
    params[:student][:photo_attributes].delete(:image_data)
  end
end

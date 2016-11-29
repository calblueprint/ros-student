class Api::Admins::ComponentsController < Api::Admins::BaseController
  load_and_authorize_resource :subsection, only: :create
  load_and_authorize_resource :component, through: :subsection, shallow: :true

  prepend_before_filter :convert_image, only: [:create, :update]
  prepend_before_filter :convert_audio, only: [:create, :update]

  def create
    if @component.save
      render json: @component, serializer: ComponentSerializer
    else
      error_response(@component)
    end
  end

  def update
    if @component.update(component_params)
      render json: @component, user: current_user, serializer: ComponentSerializer
    else
      error_response(@component)
    end
  end

  def destroy
    if @component.destroy
      render json: @component.subsection.components, each_serializer: ComponentListSerializer
    else
      error_response(@component)
    end
  end

  def switch_position
    if @component.switch(switch_position_params)
      render json: @component, serializer: ComponentSerializer
    else
      error_response(nil, 'Invalid position given')
    end
  end


  private

  def component_params
    params.require(:component).permit(
      :component_type,
      :title,
      :form_key,
      :audio,
      :audio_url,
      :content_url,
      :position,
      :subsection_id,
      photo_attributes: [:image],
    )
  end

  def switch_position_params
    params.require(:component).permit(:position)
  end

  def convert_audio
    return if params[:component][:audio_data].blank?

    audio_file = FileUploadUtils.convert_base64(params[:component][:audio_data])
    return unless audio_file

    params[:component][:audio] = audio_file
    params[:component].delete(:audio_data)
  end

  def convert_image
    return if params[:component][:photo_attributes].blank? ||
      params[:component][:photo_attributes][:image_data].blank?

    image_file = FileUploadUtils.convert_base64(
        params[:component][:photo_attributes][:image_data])
    return unless image_file

    params[:component][:photo_attributes][:image] = image_file
    params[:component][:photo_attributes].delete(:image_data)
  end
end

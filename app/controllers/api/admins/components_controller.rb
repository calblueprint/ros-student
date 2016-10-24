class Api::Admins::ComponentsController < Api::Admins::BaseController
  load_and_authorize_resource :subsection, only: :create
  load_and_authorize_resource :component, through: :subsection, shallow: :true

  def create
    if @component.save
      render json: @component, serializer: ComponentSerializer
    else
      error_response(@component)
    end
  end

  def update
    if @component.update(component_params)
      render json: @component, serializer: ComponentSerializer
    else
      error_response(@component)
    end
  end

  def destroy
    if @component.destroy
      render json: @component, serializer: ComponentSerializer
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
      :audio_url,
      :content_url,
      :position,
      :subsection_id,
    )
  end

  def switch_position_params
    params.require(:component).permit(:position)
  end
end

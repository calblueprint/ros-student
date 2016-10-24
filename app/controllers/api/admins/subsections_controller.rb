class Api::Admins::SubsectionsController < Api::Admins::BaseController
  load_and_authorize_resource

  def create
    if @subsection.save
      render json: @subsection, serializer: SubsectionSerializer
    else
      error_response(@subsection)
    end
  end

  def update
    if @subsection.update(subsection_params)
      render json: @subsection, serializer: SubsectionSerializer
    else
      error_response(@subsection)
    end
  end

  def destroy
    if @subsection.destroy
      render json: @subsection, serializer: SubsectionSerializer
    else
      error_response(@subsection)
    end
  end

  def switch_position
    if @subsection.switch(switch_position_params)
      render json: @subsection, serializer: SubsectionSerializer
    else
      error_response(nil, 'Invalid position given')
    end
  end


  private

  def subsection_params
    params.require(:subsection).permit(
      :title,
      :section_id,
      :position
    )
  end

  def switch_position_params
    params.require(:subsection).permit(:position)
  end
end

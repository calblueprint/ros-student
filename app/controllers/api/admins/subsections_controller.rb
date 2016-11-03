class Api::Admins::SubsectionsController < Api::Admins::BaseController
  load_and_authorize_resource :section
  load_and_authorize_resource :subsection, through: :section, shallow: :true

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
    if @subsection.remove_from_list and @subsection.destroy
      render json: @subsection.section.subsections, each_serializer: SubsectionListSerializer
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
    params.fetch(:subsection, {}).permit(
      :title,
      :section_id,
    )
  end

  def switch_position_params
    params.require(:subsection).permit(:position)
  end
end

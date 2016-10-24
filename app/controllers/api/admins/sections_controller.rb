class Api::Admins::SectionsController < Api::Admins::BaseController
  load_and_authorize_resource

  def create
    if @section.save
      render json: @section, serializer: SectionSerializer
    else
      error_response(@section)
    end
  end

  def update
    if @section.update(section_params)
      render json: @section, serializer: SectionSerializer
    else
      error_response(@section)
    end
  end

  def destroy
    if @section.destroy
      render json: @section, serializer: SectionSerializer
    else
      error_response(@section)
    end
  end

  def switch_position
    if @section.switch(switch_position_params)
      render json: @section, serializer: SectionSerializer
    else
      error_response(nil, 'Invalid position given')
    end
  end

  private

  def section_params
    params.require(:section).permit(
      :title,
      :course_id,
      :position
    )
  end

  def switch_position_params
    params.require(:section).permit(:position)
  end
end

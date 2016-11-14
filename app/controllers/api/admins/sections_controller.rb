class Api::Admins::SectionsController < Api::Admins::BaseController
  load_and_authorize_resource :course
  load_and_authorize_resource :section, through: :course, shallow: :true

  def create
    if @section.save
      render json: @section, serializer: SectionSerializer
    else
      error_response(@section)
    end
  end

  def update
    puts section_params
    if @section.update(section_params)
      render json: @section, user: current_user, serializer: SectionSerializer
    else
      error_response(@section)
    end
  end

  def destroy
    if @section.remove_from_list and @section.destroy
      render json: @section.course.sections, each_serializer: SectionListSerializer
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
    params.fetch(:section, {}).permit(
      :title,
      :course_id,
      :position
    )
  end

  def switch_position_params
    params.require(:section).permit(:position)
  end
end

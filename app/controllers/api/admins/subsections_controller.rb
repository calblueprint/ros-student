class Api::Admins::SubsectionsController < Api::Admins::BaseController
  load_and_authorize_resource :section
  load_and_authorize_resource :subsection, through: :section, shallow: :true

  def create
    if @subsection.save
      render json: @subsection, serializer: SubsectionAdminSerializer, root: false
    else
      error_response(@subsection)
    end
  end

  def index
    render json: @subsections, each_serializer: SubsectionListSerializer
  end

  def update
    if @subsection.update(subsection_params)
      render json: @subsection, user: current_user, serializer: SubsectionAdminSerializer, root: false
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
      render json: @subsection, serializer: SubsectionAdminSerializer, root: false
    else
      error_response(nil, 'Invalid position given')
    end
  end

  def switch_section
    if @subsection.remove_from_list && @subsection.update(switch_section_params)
      @subsection.move_to_position
      render json: @subsection, serializer: SubsectionAdminSerializer, root: false
    else
      error_response(nil, 'Could not move subsection')
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

  def switch_section_params
    params.require(:subsection).permit(
      :id,
      :section_id,
    )
  end
end

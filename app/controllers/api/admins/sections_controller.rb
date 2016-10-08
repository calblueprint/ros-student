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

  private

  def section_params
    params.require(:section).permit(
      :title,
      :course_id,
      :position
    )
  end
end

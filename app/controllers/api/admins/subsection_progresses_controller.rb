class Api::Admins::SubsectionProgressesController < Api::BaseController
  load_and_authorize_resource

  def create
    if @subsection_progress.save
      render json: @subsection_progress, user: current_user, serializer: SubsectionProgressSerializer
    else
      error_response(@subsection_progress)
    end
  end

  private

  def subsection_progress_params
    params.require(:subsection_progress).permit(
      :subsection_id,
      :student_id
    )
  end

end

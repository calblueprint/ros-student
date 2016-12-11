class Api::Students::SubsectionProgressesController < Api::Students::BaseController
  load_and_authorize_resource

  def create
    if @subsection_progress.save
      render json: @subsection_progress, user: current_user, serializer: SubsectionProgressSerializer
    else
      error_response(@subsection_progress)
    end
  end

  def show
    render json: @subsection_progress, user: current_user, serializer: SubsectionProgressSerializer
  end

  private

  def subsection_progress_params
    params.require(:subsection_progress).permit(
      :subsection_id,
      :student_id
    )
  end

end

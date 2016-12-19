class Api::Students::ComponentProgressesController < Api::Students::BaseController
  load_and_authorize_resource

  def create
    if @component_progress.save
      render json: @component_progress, user: current_user, serializer: ComponentProgressSerializer
    else
      error_response(@component_progress)
    end
  end

  def show
    render json: @component_progress, user: current_user, serializer: ComponentProgressSerializer
  end

  private

  def component_progress_params
    params.require(:component_progress).permit(
      :component_id,
      :student_id
    )
  end
end

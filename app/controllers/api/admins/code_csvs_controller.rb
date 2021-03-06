class Api::Admins::CodeCsvsController < Api::Admins::BaseController
  load_and_authorize_resource

  def create
    if @code_csv.save
      # Call generate_csv for this code_csv here
      @code_csv.generate_codes(code_csv_args)
      render json: @code_csv, serializer: CodeCsvSerializer
    else
      error_response(@code_csv)
    end
  end

  def download
    respond_to do |format|
      format.csv { show_csv }
      format.json { index }
    end
  end

  def index
    render json: @code_csvs.order("LOWER(name)"), each_serializer: CodeCsvListSerializer
  end

  def show
    render json: @code_csv, serializer: CodeCsvSerializer
  end

  private

  def code_csv_params
    params.require(:code_csv).permit(
      :name
    )
  end

  def code_csv_args
    params.require(:code_csv_args).permit(
      :amount,
      :course_ids,
      :self_paced,
    )
  end

  def show_csv
    send_data @code_csv.to_csv
  end
end

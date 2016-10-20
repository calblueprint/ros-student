class Api::CodeCsvsController < Api::BaseController

  def create
    if @code_csv.save
      # Call generate_csv for this code_csv here
      render json: @code_csv, serializer: CodeCsvSerializer
    else
      error_response(@code_csv)
    end
  end

end

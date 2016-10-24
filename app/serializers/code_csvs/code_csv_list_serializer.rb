class CodeCsvListSerializer < ActiveModel::Serializer
  has_many :code_csvs, each_serializer: BaseCodeCsvSerializer
end

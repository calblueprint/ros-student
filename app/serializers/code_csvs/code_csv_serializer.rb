class CodeCsvSerializer < BaseCodeCsvSerializer
  has_many :courses, each_serializer: CourseAdminListSerializer

  def courses
    object.codes.last ? object.codes.last.courses : []
  end
end

class CourseAdminListSerializer < BaseCourseSerializer
  attributes :image_url

  def image_url
    object.photo.thumbnail if object.photo
  end
end

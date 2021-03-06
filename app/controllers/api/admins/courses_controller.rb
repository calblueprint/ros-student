class Api::Admins::CoursesController < Api::Admins::BaseController
  load_and_authorize_resource

  has_scope :is_published, type: :boolean

  prepend_before_filter :convert_image, only: [:update]

  def index
    render json: @courses.order("is_published").reverse_order, each_serializer: CourseAdminListSerializer
  end

  def edit
    render json: @course, user: current_user, serializer: CourseAdminSerializer, root: false
  end

  def update
    if @course.update(course_params)
      render json: @course, user: current_user, serializer: CourseAdminSerializer, root: false
    else
      error_response(@course)
    end
  end

  def destroy
    if @course.destroy
      render json: @course, serializer: CourseAdminSerializer, root: false
    else
      error_response(@course)
    end
  end

  def import
    ImportCourseJob.perform_async(current_admin.id, import_params)
    success_response
  end

  def export
    send_data CourseAdminSerializer.new(@course, root: false).to_json
  end

  private

  def course_params
    params.require(:course).permit(
      :name,
      :description,
      :is_published,
      photo_attributes: [:image],
    )
  end

  def import_params
    params.require(:course).permit(
      :file,
    )
  end

  def convert_image
    return if params[:course][:photo_attributes].blank? ||
      params[:course][:photo_attributes][:image_data].blank?

    image_file = FileUploadUtils.convert_base64(
        params[:course][:photo_attributes][:image_data])
    return unless image_file

    params[:course][:photo_attributes][:image] = image_file
    params[:course][:photo_attributes].delete(:image_data)
  end
end

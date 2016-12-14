class Api::Admins::CoursesController < Api::Admins::BaseController
  load_and_authorize_resource

  prepend_before_filter :convert_image, only: [:create, :update]

  def index
    render json: @courses, each_serializer: CourseAdminListSerializer
  end

  def create
    if @course.save
      render json: @course, serializer: CourseAdminSerializer, root: false
    else
      error_response(@course)
    end
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
    if ImportCourse.new(import_params).import_course
      success_response('Successfully imported course.')
    else
      error_response(nil, 'Invalid course information. Error:')
    end
  end

  def export
    send_data CourseAdminSerializer.new(@course).to_json
  end

  private

  def course_params
    params.require(:course).permit(
      :name,
      :description,
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

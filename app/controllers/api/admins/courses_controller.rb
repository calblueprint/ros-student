class Api::Admins::CoursesController < Api::Admins::BaseController
  load_and_authorize_resource

  prepend_before_filter :convert_image, only: [:create, :update]

  def create
    if @course.save
      render json: @course, serializer: CourseSerializer
    else
      error_response(@course)
    end
  end

  def update
    if @course.update(course_params)
      render json: @course, user: current_user, serializer: CourseSerializer
    else
      error_response(@course)
    end
  end

  def destroy
    if @course.destroy
      render json: @course, serializer: CourseSerializer
    else
      error_response(@course)
    end
  end

  private

  def course_params
    params.require(:course).permit(
      :name,
      :description,
      photo_attributes: [:image],
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

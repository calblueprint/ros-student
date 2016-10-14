class Admins::CoursesController < Admins::BaseController
  load_and_authorize_resource

<<<<<<< fa60642921b19469817e36041daba2df39612332
  def create
    @course = Course.create
    redirect_to edit_course_path(@course)
  end

  def edit
=======
  def new
  end

  def edit
    
>>>>>>> Create course edit bundle
  end

end

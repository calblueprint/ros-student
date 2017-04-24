class AdminMailer < ApplicationMailer
  def create_admin(user, password)
    @user = user
    @password = password

    mail(to: @user.email, subject: '[Roots of Success] Admin Created')
  end

  def send_request(user, request)
    @user = user
    @request = request
    mail(to: @user.email, subject: '[Roots of Success] Course Request Status Updated')
  end

  def imported_course(user, course)
    @user = user
    @course = course
    mail(to: @user.email, subject: '[Roots of Success] Course Imported')
  end
end

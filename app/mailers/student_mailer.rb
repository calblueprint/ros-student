class StudentMailer < ApplicationMailer
  def course_finish(user, course)
    @user = user
    @course = course
    Admin.all.map do |admin|
      @admin = admin
      mail(to: admin.email, subject: '[Roots of Success] Student finished course')
    end
  end
end

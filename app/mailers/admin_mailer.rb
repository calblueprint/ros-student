class AdminMailer < ApplicationMailer
  def create_admin(user, password)
    @user = user
    @password = password

    mail(to: @user.email, subject: '[Roots of Success] Admin Created')
  end
end

module ErrorReponseRedirects
  # 401 Unauthorized response
  def authentication_error
    respond_to do |format|
      format.html do
        flash[:error] = 'You are not logged in.'
        session[:user_return_to] = request.fullpath
        redirect_to root_path
      end
    end
  end

  # 403 Forbidden response
  def authorization_error
    respond_to do |format|
      format.html { render '/rescues/access_denied', status: 403 }
      # format.json { render json: 'Access Denied', status: 403 }
    end
  end
end

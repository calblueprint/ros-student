class DeviseFailure < Devise::FailureApp
  def redirect_url
    admin_session_path == attempted_path ? admin_session_path
                                         : root_path
  end

  def respond
    if http_auth?
      http_auth
    else
      redirect
    end
  end
end

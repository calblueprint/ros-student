class Api::PagesController < Api::BaseController
  def ping
    success_response('ping')
  end
end

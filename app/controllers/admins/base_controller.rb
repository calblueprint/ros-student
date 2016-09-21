class Admins::BaseController < ApplicationController
  before_filter :authenticate_admin!
end

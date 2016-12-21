class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :authenticate_user!

  def index
    render text: 'we\'re in the system'
  end
end

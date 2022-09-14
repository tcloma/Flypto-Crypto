class ApplicationController < ActionController::API
  include ActionController::Cookies
  # skip_before_action :verify_authenticity_token
  before_action :authorize

  def authorized
    return render json: {error: 'Not Authrorized'},
    status: :unauthorized
    unless session.include? :user_id
    end
  end

  private

  def authorize
    @current_user = User.find_by(id: session[:user_id]) 
  end
end
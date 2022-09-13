class ApplicationController < ActionController::API
  include ActionController::Cookies
  # skip_before_action :verify_authenticity_token
end
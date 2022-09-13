class UsersController < ApplicationController
  # before_action :authorize
  # skip_before_action :authorize, only: :create
  before_action :authorize, only: [:show]
  # skip_before_filter :verify_authenticity_token 

  def create
    user = User.create!(user_params)
    if user.valid?
      session[:user_id] = user.id
      render json: user, status: :created
    else
      render json: { error: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    user = User.find_by(id: session[:user_id])
    render json: user
  end

  private
  def user_params 
    params.permit(:name, :email, :password, :funds)
  end

end

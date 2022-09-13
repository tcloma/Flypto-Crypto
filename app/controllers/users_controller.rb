class UsersController < ApplicationController
  # before_action :authorize
  # skip_before_action :authorize, only: :create
  before_action :authorize, only: [:show]
  # skip_before_filter :verify_authenticity_token 

  def index
    render json: User.all
  end

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
    if user
      render json: user
    else
      render json: {error: 'Not Authorize'}
    end
  end

  def update 
    user = User.find_by(id: session[:user_id])
    if user.update(patch_params)
      render json: user, status: :created
    else 
      render json: {error: user.errors.full_messages}
    end
  end

  private
  def user_params 
    params.permit(:name, :email, :password, :funds)
  end

  def patch_params
    params.permit(:funds)
  end

end

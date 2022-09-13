class UsersController < ApplicationController
  # before_action :authorize
  # skip_before_action :authorize, only: :create
  # skip_before_action :authorize, only: [:show]
  # before_action :authorize, only: [:index]
  # skip_before_filter :verify_authenticity_token 

  def index
    render json: User.all
  end

  def create
    user = User.create!(user_params)
    if user.valid?
      render json: user, status: 202
    else
      render json: { error: 'Not Valid' }, status: :unprocessable_entity
    end
  end

  def show
    user = User.find_by(id: params[:id])
    if user
      render json: user
    else
      render json: {error: 'Not Authorized'}, status: 404
    end
  end

  def destroy
    destroy_user = User.find_by(id: params[:id])
    if destroy_user.valid?
      destroy_user.destroy
      render json: destroy_user
    else
      render json: {error: 'User not found'}, status: 404
    end
  end

  private

  def user_params 
    params.permit(:name, :last_name, :email, :password_digest, :funds)
  end
end

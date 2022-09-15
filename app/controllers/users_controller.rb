class UsersController < ApplicationController
  skip_before_action :authorize, only: :create

  def index
    render json: User.all
  end

  # def create
  #   user = User.create!(user_params)
  #   if user.valid?
  #     render json: user, status: 202
  #   else
  #     render json: { error: 'Not Valid' }, status: :unprocessable_entity
  #   end
  # end

  # def show
  #   user = User.find_by(id: session[:user_id])
  #   if user
  #     render json: user
  #   else
  #     render json: {error: 'Not Authorized'}, status: 404
  #   end
  # end

  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  def show
    @current_user = User.find(session[:user_id])
    render json: @current_user
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
    params.permit(:name, :last_name, :email, :password)
  end

  def patch_params
    params.permit(:funds)
  end

end

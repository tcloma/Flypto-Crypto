class SessionsController < ApplicationController

  #  create method in ruby means finding 
  def create
    user = User.find_by(username: params[:username])

    if (user && authenticate(user, params[:password])
      session[:user_id] = user.id
      render json: user, status: 202
    else
      render json: { error: "Invalid username or password" }, status: 404
    end
  end

  def destroy
    session.delete :user_id
    head :no_content
  end

  private

  def authenticate (user, password)
    if (user.password == password)
      return true
    else
      return false
    end
  end

  # def user_params
  #   params.permit(:name, :last_name, :password_digest, :username, :password)
  # end

end

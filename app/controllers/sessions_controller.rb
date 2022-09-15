class SessionsController < ApplicationController
  skip_before_action :authorize, only: :create
  # get '/login', to: 'sessions#login'
  # post '/login', to: 'sessions#create'
  # post '/logout', to: 'sessions#destroy'
  # delete '/logout', to: 'sessions#destroy'

  #  create method in ruby means finding 
  def create
    user = User.find_by(email: params[:email])
    if (user&.authenticate(params[:password]))
      session[:user_id] = user.id
      render json: user
      else
      render json: {error: "Username or Password is not correct"}, status: :not_found
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

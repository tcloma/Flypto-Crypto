class SessionsController < ApplicationController

   # creating login method
   def create
      user = User.find_by(username: params[:username])
      sessions[:user_id] = user.id
      render json: user
   end
end

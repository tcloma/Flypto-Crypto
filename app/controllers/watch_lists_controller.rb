class WatchListsController < ApplicationController
  def index 
    user = find_user
    if user
      render json: user.watch_lists.all, status: :found
    else 
      render json: {error: "User Watchlist not found"}
    end
  end

  def show 
    watch_list = WatchList.find_by(id: params[:id])
    if watch_list
      render json: watch_list, status: :found
    else 
      render json: {error: "User Watchlist not found"}
    end
  end

  def create
    watch_list = WatchList.create(watchlist_params)
    render json: watch_list, status: :created
  end

  def destroy
    watchList = WatchList.find_by(id: params[:id])
    watchList.destroy
    head :no_content
  end

  private 

  def watchlist_params
    params.permit(:name, :symbol, :user_id)
  end

  def find_user
    User.find_by(id: session[:user_id])
  end

end

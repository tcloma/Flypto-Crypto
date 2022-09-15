class PositionListsController < ApplicationController
  def index
    user = User.find_by(id: session[:user_id])
    if user
      render json: user.position_lists.all
    else  
      render json: {error: "Position_List not found"}, status: :not_found
    end
  end

  def show 
    position_list = PositionList.find_by(id: params[:id])
    if position_list
      render json: position_list
    else 
      render json: {error: "Position_List not found"}, status: :not_found
    end
  end

  def create 
    position = PositionList.create(post_params)
    render json: position, status: :created
  end

  private 

  def post_params
    params.permit(:time_of_purchase, :price_of_purchase, :purchased_coin_id)
  end

end

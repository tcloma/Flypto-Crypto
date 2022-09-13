class PurchasedCoinsController < ApplicationController
  
  def index
    render json: PurchasedCoin.all
  end

  def show 
    user = User.find_by(id: params[:id])
    if user 
      render json: user, status: :found
    else
      render json: {error: "Purchased_Coin not found"}, status: :Not_Found
    end
  end

end

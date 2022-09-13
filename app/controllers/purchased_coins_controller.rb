class PurchasedCoinsController < ApplicationController
  
  def index
    user = find_user
    if user
    render json: user.purchased_coins, status: :found
    else
      render json: {error: "User Purchased Coin not found"}
    end
  end

  def show 
    purchase_coin = PurchasedCoin.find_by(id: params[:id])
    if purchase_coin
      render json: purchase_coin, status: :found
    else
      render json: {error: "Purchased_Coin not found"}, status: :not_found
    end
  end

  def create 
    watch_list = PurchasedCoin.create(post_params)
    render json: watch_list, status: :created
  end

  def update 
    watch_list = PurchasedCoin.find_by(id: params[:id])
    if watch_list.update(coin_params)
      render json: watch_list, status: :found
    else 
      render json: {error: "Purchased_Coin not found"}, status: :not_found
    end
  end

  def destroy 
    coin = PurchasedCoin.find_by(id: params[:id])
    coin.destroy
    head :no_content
  end

  private 

  def post_params
    params.permit(:quantity, :price, :name, :symbol, :user_id)
  end

  def coin_params
    params.permit(:quantity, :price)
  end

  def find_user
    User.find_by(id: session[:user_id])
  end

end

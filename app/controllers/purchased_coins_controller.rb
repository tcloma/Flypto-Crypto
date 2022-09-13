class PurchasedCoinsController < ApplicationController
  def index
    render json: PurchasedCoin.all
  end
end

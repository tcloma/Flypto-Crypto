Rails.application.routes.draw do
  # User.rb routes
  get '/users', to: 'users#index'
  get '/users/:id', to: 'users#show'
  post '/users', to: 'users#create'     # params : name, password, email
  patch '/users/:id', to: 'users#update'    # params : funds

  # PurchasedCoins.rb routes
  get '/purchasedcoins', to: 'purchasedcoins#index'
  patch '/purchasedcoins/:id', to: 'purchasedcoins#update'    #update the quantity when you purchase
  delete '/purchasedcoins/:id', to: 'purchasedcoins#destroy'

  # WatchList.rb routes
  get '/watchlists', to: 'watchlists#index'
  get '/watchlists/:id', to: 'watchlists#show'
  delete '/watchlists/:id', to: 'watchlist#destroy'

  
  #
end

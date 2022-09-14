Rails.application.routes.draw do
  # User.rb routes
  get '/users', to: 'users#index'
  get '/me', to: 'users#show'       # staying logged in 
  get '/auth', to: 'users#show'
  post '/signup', to: 'users#create'     # params : name, password, email, funds
  patch '/users', to: 'users#update'    # params : funds

  # Login and Logout Routes - Sessions
  get '/login', to: 'sessions#login'
  post '/login', to: 'sessions#create'
  post '/logout', to: 'sessions#destroy'
  delete '/logout', to: 'sessions#destroy'

    # WatchList.rb routes
  get '/watchlists', to: 'watch_lists#index'
  get '/watchlists/:id', to: 'watch_lists#show'
  post '/watchlists', to: 'watch_lists#create'
  delete '/watchlists/:id', to: 'watch_lists#destroy'


  # PurchasedCoins.rb routes
  get '/purchasedcoins', to: 'purchased_coins#index'
  get '/purchasedcoins/:id', to: 'purchased_coins#show'
  post '/purchasedcoins', to: "purchased_coins#create"
  patch '/purchasedcoins/:id', to: 'purchased_coins#update'    #update the quantity when you purchase
  delete '/purchasedcoins/:id', to: 'purchased_coins#destroy'
  

  # PositionList.rb routes
  get '/positionlists', to: "position_lists#index"
  get '/positionlists/:id', to: "position_lists#show"
  post '/positionlists', to: "position_lists#create"

  
end

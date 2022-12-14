# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

User.destroy_all 
PurchasedCoin.destroy_all
PositionList.destroy_all
WatchList.destroy_all


hammad = User.create(name: "Hammad", email: "hammadfaiz@gmail.com", password: "faiz", funds: 150000)
hazy = User.create(name: "Hazy", email: "haze@gmail.com", password: "haze", funds: 50000)

purchase = PurchasedCoin.create(name: "Bitcoin", symbol: "bitcoin", quantity: "2", user_id: hammad.id)
newPurchase = PurchasedCoin.create(name: "Fake Bitcoin", symbol: "fake bitcoin", quantity: "5", user_id: hazy.id)

PositionList.create(time_of_purchase: "12 pm", price_of_purchase: 9000, purchased_coin_id: purchase.id)
PositionList.create(time_of_purchase: "9 pm", price_of_purchase: 10000, purchased_coin_id: newPurchase.id)

WatchList.create(name: "Bitcoin", symbol: "bitcoin", user_id: hammad.id)
WatchList.create(name: "Randome", symbol: "randome", user_id: hazy.id)


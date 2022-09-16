class PurchasedCoinSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :symbol, :quantity, :user_id
  has_many :position_lists
end

class PurchasedCoinSerializer < ActiveModel::Serializer
  attributes :id, :name, :symbol, :quantity, :user_id
  has_many :position_lists
end

class PositionListSerializer < ActiveModel::Serializer
  attributes :id, :time_of_purchase, :price_of_purchase, :quantity_purchased
  belongs_to :purchased_coin
end

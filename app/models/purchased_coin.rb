class PurchasedCoin < ApplicationRecord
  has_many :position_lists
  belongs_to :user
end

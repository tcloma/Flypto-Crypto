class PurchasedCoin < ApplicationRecord
  belongs_to :user
  has_many :position_lists
end

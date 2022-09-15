class PurchasedCoin < ApplicationRecord
  belongs_to :user
  has_many :position_lists

  validates :name, uniqueness: true
end

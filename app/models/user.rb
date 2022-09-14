class User < ApplicationRecord
  has_many :watch_lists
  has_many :purchased_coins
  has_many :position_lists, through: :purchased_coins

  has_secure_password

  validates :email, presence: true, uniqueness: true
end

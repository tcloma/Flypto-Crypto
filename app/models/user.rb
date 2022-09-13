class User < ApplicationRecord
  
  has_secure_password

  has_many :watch_lists
  has_many :purchased_coins
  has_many :position_lists, through: :purchased_coins

  validates :email, uniqueness: true
end

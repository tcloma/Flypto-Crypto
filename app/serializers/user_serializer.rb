class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :password_digest, :email, :funds
  has_many :purchased_coins
end

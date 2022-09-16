class CreatePurchasedCoins < ActiveRecord::Migration[7.0]
  def change
    create_table :purchased_coins do |t|
      t.string :name
      t.string :symbol
      t.float :quantity
      t.float :price
      t.float :price_change
      t.integer :user_id

      t.timestamps
    end
  end
end

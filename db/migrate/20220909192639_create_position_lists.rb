class CreatePositionLists < ActiveRecord::Migration[7.0]
  def change
    create_table :position_lists do |t|
      t.datetime :time_of_purchase
      t.float :price_of_purchase
      t.float :quantity_purchased
      t.integer :purchased_coin_id

      t.timestamps
    end
  end
end

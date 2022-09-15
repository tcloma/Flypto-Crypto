class ChangeColumn < ActiveRecord::Migration[7.0]
    def change
      change_column :users, :funds, :integer, :default => 100000
    end
  end
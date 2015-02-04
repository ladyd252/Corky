class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :title, null: false
      t.string :phone_number
      t.integer :creator_id, null: false

      t.timestamps null: false
    end
    add_index :events, :creator_id
  end
end

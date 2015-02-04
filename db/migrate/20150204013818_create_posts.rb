class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :body
      t.string :picture_url
      t.integer :event_id, null: false
      t.timestamps null: false
    end

    add_index :posts, :event_id
  end
end

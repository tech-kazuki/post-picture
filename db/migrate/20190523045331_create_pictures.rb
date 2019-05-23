class CreatePictures < ActiveRecord::Migration[5.2]
  def change
    create_table :pictures do |t|
      t.string :title
      t.text :image
      t.text :detail
      t.string :user_name
      t.timestamps
    end
  end
end

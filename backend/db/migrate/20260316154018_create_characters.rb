class CreateCharacters < ActiveRecord::Migration[8.1]
  def change
    create_table :characters do |t|
      t.string :name
      t.float :x_min
      t.float :x_max
      t.float :y_min
      t.float :y_max

      t.timestamps
    end
  end
end

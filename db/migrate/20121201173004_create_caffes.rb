class CreateCaffes < ActiveRecord::Migration
  def up
    create_table :caffes do |t|
      t.string :name
      t.string :address
      t.float :latitude
      t.float :longitude
      t.boolean :gmaps

      t.timestamps
    end
  end
  def down
    drop_table :caffes 
  end
end

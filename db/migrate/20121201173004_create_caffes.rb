class CreateCaffes < ActiveRecord::Migration
  def change
    create_table :caffes do |t|
      t.string :name
      t.string :address

      t.timestamps
    end
  end
end

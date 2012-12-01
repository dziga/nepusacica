class CreateOpinions < ActiveRecord::Migration
  def change
    create_table :opinions do |t|
      t.integer :caffe_id
      t.text :comment
      t.integer :rating

      t.timestamps
    end
  end
end

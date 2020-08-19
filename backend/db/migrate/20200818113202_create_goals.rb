class CreateGoals < ActiveRecord::Migration[6.0]
  def change
    create_table :goals do |t|
      t.references :user, null: false, foreign_key: true
      t.text :description
      t.boolean :complete

      t.timestamps
    end
  end
end

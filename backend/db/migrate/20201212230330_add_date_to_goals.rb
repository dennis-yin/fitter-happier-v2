class AddDateToGoals < ActiveRecord::Migration[6.0]
  def change
    add_column :goals, :date, :Date, default: Date.today, null: false
  end
end

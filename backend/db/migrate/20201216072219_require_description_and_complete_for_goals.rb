class RequireDescriptionAndCompleteForGoals < ActiveRecord::Migration[6.0]
  def change
    change_column_null :goals, :description, false
    change_column_null :goals, :complete, false
  end
end

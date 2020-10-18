class Goal < ApplicationRecord
  belongs_to :user
  belongs_to :category

  def self.goals_for_today(user_id)
    return Goal.where('user_id = ? AND created_at::date = ?', user_id, Date.today)
  end
end

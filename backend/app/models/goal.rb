class Goal < ApplicationRecord
  belongs_to :user
  belongs_to :category

  scope :filter_by_date, ->(user_id, date) { where('user_id = ? AND date = ?', user_id, date) }
end

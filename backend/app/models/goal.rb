class Goal < ApplicationRecord
  belongs_to :user, :category
end

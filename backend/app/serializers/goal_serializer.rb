class GoalSerializer
  include FastJsonapi::ObjectSerializer
  attributes :user_id, :description, :complete, :category_id
  belongs_to :category
  belongs_to :user
end

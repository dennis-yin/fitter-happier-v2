class CategorySerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :image_url
  has_many :goals
end

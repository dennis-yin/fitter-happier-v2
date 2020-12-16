class RemoveImageUrlFromCategories < ActiveRecord::Migration[6.0]
  def change
    remove_column :categories, :image_url, :string
  end
end

class Api::V1::CategoriesController < ApplicationController
  before_action :set_category, only: [:show, :update, :destroy]
  before_action :authenticate_user!

  def index
    categories = Category.where(user_id: current_user.id).order(:title)
    render json: CategorySerializer.new(categories).serializable_hash.to_json
  end

  def show
    render json: @category
  end

  def create
    @category = Category.new(
      title: params[:category][:title],
      user_id: current_user.id
    )

    if @category.save
      render json: @category
    else
      puts @category.errors
      head :unprocessable_entity
    end
  end

  def update
    if @category.update(category_params)
      render json: @category
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @category.destroy
  end

  private

  def set_category
    @category = Category.find(params[:id])
  end

  def category_params
    params.require(:category).permit(:title)
  end
end

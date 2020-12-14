class Api::V1::CategoriesController < ApplicationController
  before_action :set_category, only: [:show, :update, :destroy]
  before_action :authenticate_user!

  def index
    category_ids = []
    goals = Goal.where(user_id: current_user.id)

    goals.each do |goal|
      unless category_ids.include? goal.category_id
        category_ids.push(goal.category_id)
      end
    end

    categories = Category.where(id: category_ids).order(:title)

    render json: CategorySerializer.new(categories).serializable_hash.to_json
  end

  def show
    render json: @category
  end

  def create
    if Category.exists?(title: params[:category][:title])
      head :ok
    else
      @category = Category.new(category_params)

      if @category.save
        render json: @category
      else
        puts @category.errors
        head :unprocessable_entity
      end
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

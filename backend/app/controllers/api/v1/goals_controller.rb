class Api::V1::GoalsController < ApplicationController
  before_action :set_goal, only: [:show, :update, :destroy]
  before_action :authenticate_user!

  def index
    if params[:date]
      date = Date.parse(params[:date])
      @goals = Goal.filter_by_date(current_user.id, date)
    else
      @goals = Goal.all
    end

    render json: GoalSerializer.new(@goals).serializable_hash.to_json
  end

  def create
    @goal = Goal.new(
      user_id: current_user.id,
      description: params[:goal][:description],
      complete: false,
      category_id: params[:goal][:category_id]
    )

    if @goal.save
      respond_with_goal
    else
      puts @goal.errors
      head :unprocessable_entity
    end
  end

  def update
    if @goal.update(goal_params)
      respond_with_goal
    else
      puts @goal.errors
      head :unprocessable_entity
    end
  end

  def destroy
    @goal.destroy
  end

  private

  def set_goal
    @goal = Goal.find(params[:id])
  end

  def goal_params
    params.require(:goal).permit(:description, :category_id, :complete, :date)
  end

  def respond_with_goal
    render json: GoalSerializer.new(@goal).serializable_hash.to_json
  end
end

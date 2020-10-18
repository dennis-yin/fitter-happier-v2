class Api::V1::GoalsController < ApplicationController
  before_action :set_goal, only: [:show, :update, :destroy]
  before_action :authenticate_user!

  def index
    @goals = Goal.goals_for_today(current_user.id)
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
      render json: GoalSerializer.new(@goal).serializable_hash.to_json
    else
      puts @goal.errors
      head :unprocessable_entity
    end
  end

  def update
    if @goal.update(goal_params)
      head :ok
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
    params.require(:goal).permit(:description, :category_id, :complete)
  end
end

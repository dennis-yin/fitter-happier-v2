class Api::V1::GoalsController < ApplicationController
  before_action :set_goal, only: [:show, :update, :destroy]
  before_action :authenticate_user!

  # GET /goals
  def index
    @goals = Goal.where(user_id: current_user.id)

    render json: GoalSerializer.new(@goals).serializable_hash.to_json
  end

  # GET /goals/1
  def show
    render json: @goal
  end

  # POST /goals
  def create
    @goal = Goal.new(
      user_id: current_user.id,
      description: params[:goal][:description],
      complete: false,
      category_id: params[:goal][:category_id]
    )

    if @goal.save
      head :created
    else
      puts @goal.errors
      head :unprocessable_entity
    end
  end

  # PATCH/PUT /goals/1
  def update
    if @goal.update(goal_params)
      head :ok
    else
      puts @goal.errors
      head :unprocessable_entity
    end
  end

  # DELETE /goals/1
  def destroy
    @goal.destroy
  end

  # def get_current_streak

  # end

  private

  def set_goal
    @goal = Goal.find(params[:id])
  end

  def goal_params
    params.require(:goal).permit(:description, :category_id, :complete)
  end
end

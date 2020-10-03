class Api::V1::StreaksController < ApplicationController
  before_action :authenticate_user!

  def index
    user = User.find(current_user.id)
    streak = user.get_streak(params[:category_id])

    render json: streak
  end
end

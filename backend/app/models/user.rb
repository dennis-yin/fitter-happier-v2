# Table name: users
#
# id                     :integer   not null, primary key
# email                  :string    not null
# first_name             :string
# last_name              :string
# created_at             :datetime  not null
# updated_at             :datetime  not null
# provider               :string    not null
# uid                    :string    not null
# allow_password_change  :boolean

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :trackable,
         :validatable
  include DeviseTokenAuth::Concerns::User
  extend Devise::Models

  has_many :goals

  def completed_all_goals_for_date?(date)
    goals = Goal.where('category_id = ? AND created_at::date = ?', @category_id, date)
    return false if goals.empty?

    goals.each do |goal|
      return false unless goal.complete?
    end

    true
  end

  def get_streak(category_id)
    @category_id = category_id
    streak = 0
    date = Date.today

    loop do
      if completed_all_goals_for_date?(date)
        streak += 1
        date = date.prev_day
      else
        break
      end
    end

    streak
  end
end

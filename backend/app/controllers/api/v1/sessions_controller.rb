class Api::V1::SessionsController < Devise::SessionsController
  after_action :sign_in_message, only: :create

  def create
    super do |r|
      puts "Signing in ..."
    end
  end

  private

  def sign_in_message
    puts "User signed in"
  end
end

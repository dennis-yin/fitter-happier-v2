Rails.application.routes.draw do
  require "devise_token_auth"
  mount_devise_token_auth_for "User", at: "auth"

  namespace :api do
    namespace :v1 do
      resources :goals
      resources :categories
    end
  end
end

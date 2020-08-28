Rails.application.routes.draw do
  require "devise_token_auth"
  mount_devise_token_auth_for 'User', at: 'auth'
  # devise_for :users, controller: { sessions: 'api/v1/sessions' }

  namespace :api do
    namespace :v1 do
      resources :goals
      resources :categories 
    end
  end
end

Rails.application.routes.draw do
  resources :categories
  namespace :api do
    namespace :v1 do
      resources :goals
    end
  end

  devise_for :users
end

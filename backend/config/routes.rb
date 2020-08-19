Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :goals
      resources :categories 
    end
  end

  devise_for :users
end

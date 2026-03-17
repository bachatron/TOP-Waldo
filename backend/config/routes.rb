Rails.application.routes.draw do
  resources :game_sessions, only: [:create] do
    member do
      post :check
      patch :complete
    end
  end

  get '/characters', to: 'characters#index'

  get "up" => "rails/health#show", as: :rails_health_check
  
  get '/leaderboard', to: 'leaderboard#index'
end
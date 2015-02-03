Rails.application.routes.draw do
  root to: "static_pages#root"
  resources :users, except: [:edit, :update]
  resource :session, only: [:new, :create, :destroy]
end

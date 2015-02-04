Rails.application.routes.draw do
  root to: "static_pages#root"
  resources :users, except: [:edit, :update]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
   resources :events, except: [:new, :edit]
   resources :posts, only: [:create, :destroy]
 end
end

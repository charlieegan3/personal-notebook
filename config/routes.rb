Rails.application.routes.draw do
  root 'sections#index'

  devise_for :users

  resources :sections
  resources :notes, except: [:index]
end

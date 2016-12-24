Rails.application.routes.draw do
  root 'sections#index'

  devise_for :users

  resources :sections
  resources :notes, except: [:index]

  get 'multi_edit' => 'shared#multi_edit'
end

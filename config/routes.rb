Rails.application.routes.draw do
  root 'shared#notebook'

  devise_for :users

  resources :sections, except: [:index]
  resources :notes, except: [:index]

  get 'multi_edit' => 'shared#multi_edit'
  get 'export' => 'shared#multi_edit', defaults: { format: :json }

  get 'import' => 'import#form'
  post 'import' => 'import#import'
end

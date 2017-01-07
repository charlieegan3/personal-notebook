Rails.application.routes.draw do
  root 'shared#notebook'

  get 'multi_edit' => 'shared#multi_edit'
  get 'export' => 'shared#multi_edit', defaults: { format: :json }
  get 'account' => 'shared#account'

  devise_for :users

  resources :sections, except: [:index]
  resources :notes, except: [:index]

  get 'import' => 'import#form'
  post 'import' => 'import#import'
end

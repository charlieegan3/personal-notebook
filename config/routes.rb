Rails.application.routes.draw do
  root 'shared#notebook'

  get 'multi_edit' => 'shared#multi_edit'
  get 'export' => 'shared#multi_edit', defaults: { format: :json }
  get 'account' => 'shared#account'

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  resources :sections, except: [:index] do
    get :multi_edit, on: :member
  end
  resources :notes, except: [:index]

  get 'import' => 'import#form'
  post 'import' => 'import#import'
end

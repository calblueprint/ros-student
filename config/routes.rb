Rails.application.routes.draw do
  root 'pages#home'

  # Login flow
  get '/students/sign_in', to: redirect('/')
  get '/students/sign_up', to: 'pages#home'
  get '/students/forgot_password', to: 'pages#home'
  get '/admins/sign_in', to: 'pages#home'
  get '/admins/forgot_password', to: 'pages#home'
  get '/design', to: 'pages#home'

  get '/dashboard', to: 'pages#dashboard'

  # Student Flow
  get '/students/:id/edit', to: 'pages#dashboard'

  # Course flow
  resources :courses, only: [:show]

  devise_for :students, skip: [:registrations]
  devise_for :admins, skip: [:registrations]

  scope module: 'students' do
    resources :students, only: [:create]
  end

  scope module: 'admins' do
  end

  namespace :api, defaults: { format: :json } do
    get '/ping', to: 'pages#ping'

    scope module: 'admins' do
      resources :admins, only: [:update]

      resources :courses, only: [:create, :update, :destroy], shallow: true do
        resources :sections, only: [:create, :update, :destroy] do
          resources :subsections, only: [:create, :update, :destroy] do
            resources :components, only: [:create, :update, :destroy]
          end
        end
      end
    end

    scope module: 'students' do
      resources :students, only: [:update]
    end

    resources :courses, only: [:show, :index], shallow: true do
      member do
        get :outline
      end
      resources :sections, only: [] do
        resources :subsections, only: [] do
          resources :components, only: [:show]
        end
      end
    end

    resources :codes, only: [] do
      collection do
        post :verify
      end
    end
  end
end

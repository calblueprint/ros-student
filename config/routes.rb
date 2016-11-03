Rails.application.routes.draw do
  root 'pages#home'

  # Login flow
  get '/students/sign_in', to: redirect('/')
  get '/students/sign_up', to: 'pages#home'
  get '/students/forgot_password', to: 'pages#home'
  get '/admins/sign_in', to: 'pages#home'
  get '/admins/forgot_password', to: 'pages#home'
  get '/design', to: 'pages#home'
  get '/testing', to: 'pages#home'

  get '/dashboard', to: 'pages#dashboard'

  # Student Flow
  get '/students/:id/edit', to: 'pages#dashboard'
  get '/courses/:id/outline', to: 'pages#dashboard'
  get '/courses/:id/sidebar', to: 'pages#dashboard'

  # Admin Flow
  get '/admins/code_csvs', to: 'pages#dashboard'

  # Course flow
  resources :courses, only: [:show]

  devise_for :students, skip: [:registrations]
  devise_for :admins, skip: [:registrations]

  scope module: 'students' do
    resources :students, only: [:create]
  end

  scope module: 'admins' do
    resources :courses, only: [:create, :edit]
  end

  namespace :api, defaults: { format: :json } do
    get '/ping', to: 'pages#ping'

    namespace :admins do
      resources :courses, only: [:create, :update, :destroy], shallow: true do
        resources :sections, only: [:create, :update, :destroy] do
          member do
            post :switch_position
          end
          resources :subsections, only: [:create, :update, :destroy] do
            member do
              post :switch_position
            end
            resources :components, only: [:create, :update, :destroy] do
              member do
                post :switch_position
              end
            end
          end
        end
      end
      resources :code_csvs, only: [:create, :index]
    end

    namespace :students do
    end

    scope module: 'students' do
      resources :students, only: [:update]
    end

    scope module: 'admins' do
      resources :admins, only: [:update]
    end

    resources :courses, only: [:show, :index, :edit], shallow: true do
      member do
        get :outline
      end
      resources :sections, only: [] do
        resources :subsections, only: [] do
          resources :components, only: [:show]
        end
      end
    end

    resources :courses, only: [:show, :index], shallow: true do
      member do
        get :sidebar
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

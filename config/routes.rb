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

  # Admin Flow
  get '/admins/:id/profile', to: 'pages#dashboard'

  # Student Flow
  get '/students/:id/profile', to: 'pages#dashboard'
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

  namespace :api, defaults: { format: [:json, :csv] } do
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
            resources :subsection_progresses, only: [:create]
            resources :components, only: [:create, :update, :destroy] do
              member do
                post :switch_position
              end
            end
          end
        end
      end
      resources :code_csvs, only: [:create, :index] do
        member do
          get :download
        end
      end
    end

    namespace :students do
      resources :courses, only: [:show] do
        member do
          get :outline
          get :sidebar
        end
      end
    end

    scope module: 'students' do
      resources :students, only: [:update]
    end

    scope module: 'admins' do
      resources :admins, only: [:create, :delete, :update, :index]
      resources :students, only: [:index]
    end

    resources :courses, only: [:show, :index, :edit], shallow: true do
      resources :sections, only: [] do
        resources :subsections, only: [:show] do
          resources :components, only: [:show]
          resources :subsection_progresses, only: [:show]
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

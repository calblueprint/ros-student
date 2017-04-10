Rails.application.routes.draw do
  root 'pages#home'

  # Login flow
  get '/students/sign_in', to: redirect('/')
  get '/students/sign_up', to: 'pages#home'
  get '/students/forgot_password', to: 'pages#home'
  get '/students/password/edit', to: 'pages#home'
  get '/students/password', to: 'pages#home'
  get '/admins/sign_in', to: 'pages#home'
  get '/admins/forgot_password', to: 'pages#home'
  get '/admins/password/edit', to: 'pages#home'
  get '/admins/password', to: 'pages#home'
  get '/design', to: 'pages#home'
  get '/testing', to: 'pages#home'

  get '/dashboard', to: 'pages#dashboard'

  # Admin Flow
  get '/admins/:id/profile', to: 'pages#dashboard'
  get '/admins/courses/tools', to: 'pages#dashboard'
  get '/admins/code_csvs', to: 'pages#dashboard'
  get '/admins/users', to: 'pages#dashboard'
  get '/admins/requests', to: 'pages#dashboard'

  # Student Flow
  get '/students/:id/profile', to: 'pages#dashboard'
  get '/courses/:id/outline', to: 'pages#dashboard'
  get '/students/add_courses', to: 'pages#dashboard'
  get '/students/requests', to: 'pages#dashboard'

  # Course flow
  resources :courses, only: [:show]

  devise_for :students, skip: [:registrations], controllers: {
    passwords: 'students/passwords'
  }
  devise_for :admins, skip: [:registrations], controllers: {
    passwords: 'admins/passwords'
  }

  scope module: 'students' do
    resources :students, only: [:create]
  end

  namespace :students do
    resources :courses, only: [:show]
  end

  scope module: 'admins' do
    resources :courses, only: [:create, :edit]
  end

  namespace :api, defaults: { format: [:json, :csv] } do
    get '/ping', to: 'pages#ping'

    namespace :admins do
      resources :courses, only: [:index, :edit, :update, :destroy], shallow: true do
        resources :sections, only: [:create, :index, :update, :destroy] do
          member do
            post :switch_position
          end

          resources :subsections, only: [:create, :index, :update, :destroy] do
            member do
              post :switch_position
            end
            resources :components, only: [:create, :update, :destroy] do
              member do
                post :switch_position
                patch :switch_subsection
              end
            end
          end
        end

        member do
          get :export
        end

        collection do
          post :import
        end
      end

      resources :code_csvs, only: [:create, :index, :show] do
        member do
          get :download
        end
      end

      resources :requests, only: [:index, :update]
    end

    scope module: 'admins' do
      resources :admins, only: [:create, :destroy, :update, :index]
      resources :students, only: [:index, :destroy]
    end

    namespace :students do
      resources :courses, only: [:index], shallow: true do
        resources :sections, only: [] do
          resources :subsections, only: [:show] do
            resources :components, only: [] do
              resources :component_progresses, only: [:show, :create]
            end
          end
        end
        member do
          get :outline
          get :sidebar
        end
      end
      resources :codes, only: :none do
        collection do
          post :add_courses
        end
      end
      resources :requests, only: [:create]
    end

    scope module: 'students' do
      resources :students, only: [:update]
    end

    resources :codes, only: [] do
      collection do
        post :verify
      end
    end

    resources :admins, only: [] do
      collection do
        post :reset_password
      end
    end

    resources :students, only: [] do
      collection do
        post :reset_password
      end
    end
  end
end

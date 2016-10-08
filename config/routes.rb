Rails.application.routes.draw do
  root 'pages#home'

  # Login flow
  get '/students/sign_in', to: redirect('/')
  get '/students/sign_up', to: 'pages#home'
  get '/students/forgot_password', to: 'pages#home'
  get '/admins/sign_in', to: 'pages#home'
  get '/admins/forgot_password', to: 'pages#home'

  get '/dashboard', to: 'pages#dashboard'

  devise_for :students, skip: [:registrations]
  devise_for :admins, skip: [:registrations]

  scope module: 'students' do
    resources :students, only: [:create]
  end

  scope module: 'admins' do
  end

  namespace :api, defaults: { format: :json } do
    get '/ping', to: 'pages#ping'

    resources :courses, only: [:create, :update, :destroy] do
      resources :sections, only: [:create, :update, :destroy] do
        resources :subsections, only: [:create, :update, :destroy]
      end
    end

    scope module: 'admins' do
      resources :admins, only: [:update]
    end

    scope module: 'students' do
      resources :students, only: [:update]
    end
  end

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end

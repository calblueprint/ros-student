source 'https://rubygems.org'
ruby '2.2.5'

# Rails
gem 'rails', '4.2.1'

# Core
gem 'cancancan', '1.15.0'
gem 'active_model_serializers', '0.9.4'
gem 'devise', '3.5.2'
gem 'figaro', '1.1.1'
gem 'has_scope', '0.6.0'
gem 'kaminari', '0.16.3'
gem 'nokogiri'
gem 'pg', '0.18.4'
gem 'pg_search', '1.0.5'

# React
gem 'react-rails', '1.4.0'
gem 'react-router-rails', '0.13.3.2'

# Building javascript
gem 'webpack-rails', '0.9.9'

# Client
gem 'font-awesome-rails', '4.5.0'
gem 'jquery-rails', '3.1.4'
gem 'sass-rails', '5.0.6'
gem 'uglifier', '2.7.2'

group :development, :staging, :test do
  gem 'ffaker'
end

group :development, :test do
  gem 'awesome_print'
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'quiet_assets'
  gem 'factory_girl_rails'
  gem "spring"
  gem "spring-commands-rspec"
  gem "guard-rubocop"
  gem "guard-livereload"
  gem 'rspec-rails'
  gem 'rubocop'
end

group :development do
  gem 'annotate'
  gem 'letter_opener'
  gem 'foreman'
end

group :test do
  gem "shoulda-matchers", require: false
  gem "database_cleaner"
  gem 'capybara', '~> 2.4.4'
  gem 'guard-rspec'
  gem 'launchy'

  gem "codeclimate-test-reporter", require: nil
end

group :production, :staging do
  gem 'rails_12factor'
end

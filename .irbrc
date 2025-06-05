if defined?(Rails) && Rails.env.development?
  require 'factory_bot_rails'
  include FactoryBot::Syntax::Methods
end

Dir["./", "*/"].each{ |p| $:.unshift File.absolute_path(p) unless $:.include?(File.absolute_path(p)) }

require "do/rails/version"

Gem::Specification.new do |s|
  s.name        = "do-rails"
  s.version     = Do::Rails::VERSION
  s.authors     = ["rplauindo"]
  s.homepage    = "https://github.com/rplaurindo/do-rails"
  s.summary     = "Summary of Do"
  s.description = "It's a lib that abstracts some methods to facilitate the use of Javascript and complementary the jQuery."

  DO_REQUIREMENTS = [
    "jquery-rails",
    "coffee-script"
  ]

  DO_REQUIREMENTS.each do |pkg|
    s.add_dependency pkg

  end

end

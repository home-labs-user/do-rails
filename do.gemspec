Dir["./", "*/"].each{ |p| $:.unshift File.absolute_path(p) unless $:.include?(File.absolute_path(p)) }

require "do/rails/version"

Gem::Specification.new do |s|
  s.name        = "do-rails"
  s.version     = Do::Rails::VERSION
  s.authors     = ["Rafael Laurindo"]
  s.email       = ["rafaelplaurindo@gmail.com"]
  s.homepage    = "https://rubygems.org/gems/do-rails"
  s.license     = "MIT"
  s.summary     = %q{Summary of Do}
  s.description = %q{It's a lib that abstracts some methods to facilitate the use of Javascript and complementary the jQuery.}

  DO_REQUIREMENTS = {
    :"jquery-rails" => '~> 0',
    :"coffee-script" => '~> 0'
  }

  DO_REQUIREMENTS.each do |p, v|
    s.add_runtime_dependency p, v

  end

end

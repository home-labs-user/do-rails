Dir["./", "*/"].each{ |p| $:.unshift File.absolute_path(p) unless $:.include?(File.absolute_path(p)) }

require "do/rails/version"

Gem::Specification.new do |s|
  s.name          = "do-rails"
  s.version       = Do::Rails::VERSION
  s.authors       = ["home-labs"]
  s.email         = ["home-labs@outlook.com"]
  s.homepage      = "https://rubygems.org/gems/do-rails"
  s.summary       = %q{Summary of Do}
  s.description   = %q{It's a lib that abstracts some methods to facilitate the use of Javascript and complementary the jQuery.}
  s.license       = "MIT"
  s.test_files = Dir["test/*"]

  s.files = Dir["{bin,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc", "do.gemspec"]
  s.require_paths = ["bin","lib"]

  s.add_dependency 'coffee-rails'

end

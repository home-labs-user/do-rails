$:.push File.expand_path("../lib", __FILE__)

require "do/rails/version"

Gem::Specification.new do |s|
  s.name          = "do-rails"
  s.version       = Do::Rails::VERSION
  s.authors       = ["Home Labs"]
  s.email         = ["home-labs@outlook.com"]
  s.homepage      = "https://rubygems.org/gems/do-rails"
  s.summary       = %q{Summary of Do}
  s.description   = %q{It's a lib that abstracts some methods to facilitate the use of Javascript and complementary the jQuery.}
  s.license       = "MIT"
  s.test_files = Dir["test/**/*"]

  # s.files = Dir["{bin,#{File.expand_path("../lib", __FILE__)}}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc", "do.gemspec"]
  s.files = Dir["{bin,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc", "do.gemspec"]
  s.require_paths = %w{bin lib}

  s.add_dependency 'coffee-rails', "~> 4.1"
  s.add_dependency 'jquery-rails', "~> 4.0"

end

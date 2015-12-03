$:.push File.expand_path("../lib", __FILE__)

require "jtime/rails/version"

Gem::Specification.new do |s|
  s.name          = "jtime-rails"
  s.version       = JTime::Rails::VERSION
  s.authors       = ["Home Labs"]
  s.email         = ["home-labs@outlook.com"]
  s.homepage      = "https://rubygems.org/gems/jtime-rails"
  s.summary       = %q{Summary of jTime}
  s.description   = %q{It's a lib that abstracts some methods to facilitate the use of Javascript and complementary the jQuery.}
  s.license       = "MIT"
  s.test_files = Dir["test/**/*"]

  # s.files = Dir["{bin,#{File.expand_path("../lib", __FILE__)}}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc", "do.gemspec"]
  s.files = Dir["{bin,lib}/**/*", "MIT-LICENSE", "Rakefile", "do.gemspec"]
  s.require_paths = %w{bin lib}

  s.add_dependency 'jquery-rails', "~> 4.0"
  s.add_dependency 'require_js-rails', '~> 0.0'

end

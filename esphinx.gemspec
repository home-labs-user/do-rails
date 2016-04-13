$:.push File.expand_path("../lib", __FILE__)

require "esphinx/rails/version"

Gem::Specification.new do |s|
  s.name          = "esphinx-rails"
  s.version       = ESphinx::Rails::VERSION
  s.authors       = ["Home Labs"]
  s.email         = ["home-labs@outlook.com"]
  s.homepage      = "https://rubygems.org/gems/esphinx-rails"
  s.summary       = %q{Summary of ESphinx}
  s.description   = %q{A simple and light lib for abstracts some things of the DOM.}
  s.license       = "MIT"
  s.test_files = Dir["test/**/*"]

  s.files = Dir["{bin,lib,vendor}/**/*", "MIT-LICENSE", "Rakefile", "esphinx.gemspec"]
  s.require_paths = %w{bin lib vendor}

  # s.add_dependency 'esphinx-loader-rails', '~> 0.0'

end

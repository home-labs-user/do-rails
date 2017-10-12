$:.push File.expand_path("../lib", __FILE__)

require "esphinx/rails/version"

Gem::Specification.new do |s|
  s.name        = "esphinx-rails"
  s.version     = ESphinx::Rails::VERSION
  s.authors     = ["rplaurindo"]
  s.email       = ["rafaelplaurindo@gmail.com"]
  s.homepage    = "https://rubygems.org/gems/esphinx-rails"
  s.summary     = %q{Summary of ESphinx}
  s.description = %q{Abstraction helpers for Javascript.}
  s.license     = "MIT"
  s.test_files  = Dir["test/**/*"]

  s.files = Dir["{config,lib,vendor}/**/*", "MIT-LICENSE", "Rakefile", "README.md", "esphinx.gemspec"]
  s.require_paths = %w{config lib vendor}

end

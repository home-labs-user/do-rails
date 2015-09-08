Dir["./", "*/"].each{ |p| $:.unshift File.absolute_path(p) unless $:.include?(File.absolute_path(p)) }

require "do/rails/version"

Gem::Specification.new do |s|
  s.name          = "do-rails"
  s.version       = Do::Rails::VERSION
  # gem owner <gem name> -a <email on rubygems>
  s.authors       = ["Home Labs"]
  s.email         = ["home-labs@outlook.com"]
  s.homepage      = "https://rubygems.org/gems/do-rails"
  s.summary       = %q{Summary of Do}
  s.description   = %q{It's a lib that abstracts some methods to facilitate the use of Javascript and complementary the jQuery.}
  s.license       = "MIT"

  s.files         = `git ls-files -z`.split("\x0")
  s.executables   = s.files.grep(%r{^bin/}) { |f| File.basename(f) }
  s.require_paths = ["lib"]

  # >= igual ou superior a dada versão
  # ~> entre a atual informada e uma nova versão na casa imediatamente a esquerda. Ex. ~> 0.1.1 é o mesmo que >= 0.1.1, < 0.2.0

  s.add_runtime_dependency 'do-rails', '~> 0.0.10', '>= 0.0.10'

end

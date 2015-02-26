Dir["./", "*/"].each{ |p| $:.unshift File.absolute_path(p) unless $:.include?(File.absolute_path(p)) }

require "do/rails/version"

Gem::Specification.new do |s|
  s.name          = "do-rails"
  s.version       = Do::Rails::VERSION
  s.authors       = ["Rafael Laurindo"]
  s.email         = ["rafaelplaurindo@gmail.com"]
  s.homepage      = "https://rubygems.org/gems/do-rails"
  s.summary       = %q{Summary of Do}
  s.description   = %q{It's a lib that abstracts some methods to facilitate the use of Javascript and complementary the jQuery.}
  s.license       = "MIT"

  s.files         = `git ls-files -z`.split("\x0")
  s.executables   = s.files.grep(%r{^bin/}) { |f| File.basename(f) }
  s.require_paths = ["lib"]

  # >= igual ou superior a dada versão
  # ~> entre a atual informada e uma nova versão na casa imediatamente a esquerda. Ex. ~> 0.1.1 é o mesmo que >= 0.1.1, < 0.2.0
  DO_REQUIREMENTS = {
    :"jquery-rails" => '>= 3.0.0',
    :"coffee-rails" => '>= 3.0.0'
  }

  DO_REQUIREMENTS.each do |p, v|
    s.add_runtime_dependency p, v
  end

end

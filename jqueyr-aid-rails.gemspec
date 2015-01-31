Dir["./", "*/"].each{ |p| $:.unshift File.absolute_path(p) unless $:.include?(File.absolute_path(p)) }

require "jquery/aid/rails/version"

Gem::Specification.new do |s|
  s.name        = "jquery-aid-rails"
  s.version     = Jquery::Aid::Rails::VERSION
  s.authors     = ["rplauindo"]
  s.homepage    = "https://bitbucket.org/rplaurindo"
  s.summary     = "Summary of jquery-aid-rails"
  s.description = "Description of jquery-aid-rails"

  JQUERY_AID_REQUIREMENTS = [
    "jquery-rails",
    "coffee-script"
  ]

  JQUERY_AID_REQUIREMENTS.each do |pkg|
    s.add_dependency pkg

    # s.add_dependency "jquery-ui-rails"
    # s.add_runtime_dependency "rails"
  end

end

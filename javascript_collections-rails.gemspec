Dir["./", "*/"].each{ |p| $:.unshift File.absolute_path(p) unless $:.include?(File.absolute_path(p)) }

require "javascript_collections/rails/version"

Gem::Specification.new do |s|
  s.name        = "javascript_collections-rails"
  s.version     = JavascriptCollections::Rails::VERSION
  s.authors     = ["rplauindo"]
  s.homepage    = "https://bitbucket.org/rplaurindo"
  s.summary     = "Summary of javascript_collections-rails"
  s.description = "Description of javascript_collections-rails"

  JAVASCRIPT_COLLECTIONS_REQUIREMENTS = [
    "jquery-rails",
    "coffee-script"
  ]

  JAVASCRIPT_COLLECTIONS_REQUIREMENTS.each do |pkg|
    s.add_dependency pkg

    # s.add_dependency "jquery-ui-rails"
    # s.add_runtime_dependency "rails"
  end

end

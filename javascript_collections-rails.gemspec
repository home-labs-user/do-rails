Dir["./", "*/"].each{ |p| $:.unshift File.absolute_path(p) unless $:.include?(File.absolute_path(p)) }

require "javascript_collections/rails/version"

Gem::Specification.new do |s|
  s.name        = "javascript_collections-rails"
  s.version     = JavascriptCollections::Rails::VERSION
  s.authors     = ["rplauindo"]
  s.homepage    = "https://github.com/rplaurindo/javascript_collections-rails"
  s.summary     = "Summary of JavascriptCollections"
  s.description = "Description of JavascriptCollections"

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

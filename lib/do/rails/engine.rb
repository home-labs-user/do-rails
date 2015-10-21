module Do
  module Rails

    class Engine < ::Rails::Engine
      # isolate_namespace Do::Rails

      # */ apenas o diretório
      # **/ diretório e subdiretórios
      # Dir[File.join(File.expand_path("../../../", __FILE__), "assets/*/")].each do |path|
      #   config.assets.paths << File.absolute_path(path) unless config.assets.include? File.absolute_path(path)
      # end
      # p config.assets.paths
      # http://stackoverflow.com/questions/28499923/how-can-i-add-autoload-paths-in-my-rails4-engine

      # ActiveSupport.on_load(:action_view) do
      #   include IntranetCore::Helper
      # end

    end

  end
end

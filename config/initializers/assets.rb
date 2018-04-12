# See what's difference between .application and .application.egine, if there is a effective difference.
# Rails.application.engine.config.assets.compile += ...

# Configs to Production

# precompilation on deploy. Basicaly, must be precompile the assets that contains "//= require_tree .", that mount all files in one.
Rails.application.config.assets.precompile += %w(
    esphinx/lib/async-promise.js
    esphinx.js
)

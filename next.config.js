const withPlugins = require("next-compose-plugins");
const path = require('path')

module.exports = withPlugins([], {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
  }
});

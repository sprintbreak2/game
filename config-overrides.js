const path = require('path');

module.exports = (config, env) => {
    config.module.rules.push ( {
        resolve: {
            alias :{
              react: path.resolve('./node_modules/react')
            }
        }
    }

    )
  return config
  
};
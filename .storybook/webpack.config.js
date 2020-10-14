const path = require('path');
module.exports = ({ config }) => {

  config.module.rules.push({
    test: /\.tsx?$/,
    use: [
      {
        loader: require.resolve("babel-loader"),
        options: {
          presets: [require.resolve("babel-preset-react-app")]
        }
      }, 
      
      {
        loader: require.resolve("react-docgen-typescript-loader"),
        options: {
          shouldExtractLiteralValuesFromEnum: true,
          propFilter: (prop) => {
            if (prop.parent) {
              return !prop.parent.fileName.includes('node_modules')
            }
            return true            
          }
        }
      }
    ]
  }, {
    test: /\.scss$/,
    loaders: ['style-loader', 'css-loader', 'sass-loader']
  },{
    test: /\.(gif|png|jpe?g|eot|woff|ttf|pdf)$/,
    loader: 'file-loader',
  });

  config.resolve.extensions.push(".ts", ".tsx");

  return config;
};

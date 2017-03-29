var path = require('path')
var webpack = require('webpack')


var projectRootPath = path.resolve(__dirname,'..')

var config = {
  entry: [
    path.resolve(projectRootPath,'client/index.js')
  ],
  output:{
    path: path.resolve(projectRootPath,'dist'),
    filename: 'bundle.js',
    // publicPath: '/public/'
  },
  module:{
    loaders:[
      {
        test:/\.(js|jsx)$/,
        exclude:/node_modules/,
        loader:'babel-loader',
        query:{
          presets:['react','es2015', 'stage-2'],
          plugins:[
            ["transform-runtime"],
            ["add-module-exports"],
          ]
        }
      },
      { 
        test: /\.css$/, 
        include: path.resolve(projectRootPath,'client'),
        loader: "style-loader!css-loader?importLoaders=1&modules&localIdentName=[local]--[hash:base64:5]" 
      },
      { 
        test: /\.css$/, 
        loader: 'style-loader!css-loader',
        exclude: path.resolve(projectRootPath,'client'),
      },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
    ]
  },
  //其它解决方案配置
  resolve: {
      //查找module的话从这里开始查找
      // root: 'E:/github/flux-example/src', //绝对路径
      extensions: ['', '.js', '.jsx', '.json'],
  },
  plugins:[
    new webpack.DefinePlugin({
      "process.env":{
			NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
     })
  ]
}

//添加hotreplace支持
if (process.env.NODE_ENV !== 'production') {
  config.devtool = 'eval';
  config.entry.unshift ('webpack-hot-middleware/client')
  config.plugins.unshift(new webpack.HotModuleReplacementPlugin());

  // Note: enabling React Transform and React Transform HMR:
  config.module.loaders[0].query.plugins.push([
    'react-transform', {
      transforms: [{
        transform : 'react-transform-hmr',
        imports   : ['react'],
        locals    : ['module']
      }]
    }
  ]);
}

module.exports=config;
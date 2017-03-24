var path = require('path')
var webpack = require('webpack')


var projectRootPath = path.resolve(__dirname,'.')

var config = {
  entry: [
    path.resolve(projectRootPath,'src/index.js')
  ],
  output:{
    path: path.resolve(projectRootPath,'public'),
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
        include: path.resolve(projectRootPath,'src'),
        loader: "style-loader!css-loader?importLoaders=1&modules&localIdentName=[local]--[hash:base64:5]" 
      },
      { 
        test: /\.css$/, 
        loader: 'style-loader!css-loader',
        exclude: path.resolve(projectRootPath,'src'),
      },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
    ]
  },
  //其它解决方案配置
  resolve: {
      //查找module的话从这里开始查找
      // root: 'E:/github/flux-example/src', //绝对路径
      //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
      extensions: ['', '.js', '.jsx', '.json'],
      //模块别名定义，方便后续直接引用别名，无须多写长长的地址
      alias: {
          AppStore : 'js/stores/AppStores.js',//后续直接 require('AppStore') 即可
          ActionType : 'js/actions/ActionType.js',
          AppAction : 'js/actions/AppAction.js'
      }
  },
  plugins:[
    new webpack.DefinePlugin({
      "process.env":{
        NODE_ENV:JSON.stringify(process.env.NODE_ENV)
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
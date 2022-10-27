const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const SvgInlineLoader = require('svg-inline-loader');
const FileLoader = require('file-loader');


const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
console.log('Dev:', isDev);

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'  //стоит использовать если в нескольких js файлах требуются одинаковые библиотеки
    }
  }

  if (isProd) {
    config.minimizer = [
      new CssMinimizerPlugin(),
      new TerserWebpackPlugin()
    ]
  }
  return config
}


const plugins = () => {
  const base = [
    new MiniCssExtractPlugin({
      filename: './css/style.css'
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body',
      minify: {  //Вроде итак работает, но на всякий случай оставлю
        collapseWhitespace:isProd
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns:[
        {
          from: path.resolve(__dirname,'src/img'),
          to: path.resolve(__dirname, 'dist/img')
        }
      ]
    })
  ]

  //Раскомментировать если нужно понять сколько что занимает места
  //if (isProd) {
  //  base.push(new BundleAnalyzerPlugin())
  //}

  return base
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const configLess = {
  context: path.resolve(__dirname,'src'),
  mode: 'development',
    // First, let's define an entry point for webpack to start its crawling.
  entry:{
    js: './main.js'
  },
    // Second, we define where the files webpack produce, are placed
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: filename('js')
  },
  resolve: {
     extensions: ['.js', '.json', '.png', '.svg'],
     alias: {
       '@': path.resolve(__dirname, 'src/assets'),
     },
  },
  optimization: optimization(),
  devServer: {


    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
},
    //hot:isDev,
    hot:false,
    liveReload: true
  },
  devtool: isDev ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\less$/, //
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
          ],
        },
        {
          test:/\.css$/,
          use:[
            MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        },
        {
       test: /\.svg$/,
       //loader: 'svg-inline-loader'
       include: [/src\/img/],
       loader: 'file-loader'
        },
        {
          test: /\.(png|jpg|gif)$/,
          type: 'asset/resource'
        },
        {
          test: /\.(ttf|woff|woff2|eot)$/,
          type: 'asset/resource'
        }

     /*
     ,
     {
          test: /\.svg$/,
          loader: 'svg-sprite-loader',
          options: {
            extract : true,
            outputPath : 'dist/img/' ,
            publicPath : 'sprites/'}
        }*/



      ]
    },
    plugins: plugins()
};


if (isDev) {
    configLess.plugins.push(
        new ESLintPlugin()
    );
};

module.exports = configLess;

/*
 * @Author: luckyNwa
 * @Date: 2023-04-17 15:14:06
 */
const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = defineConfig({
  transpileDependencies: true,
  assetsDir: 'static', //打包配置文件
  parallel: false,
  publicPath: './',
  configureWebpack: {
    externals: {
      $: 'jquery',
      jQuery: 'jquery',
      'windows.jQuery': 'jquery',
    },
    plugins: [
      // 配置compression-webpack-plugin压缩
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: /\.js$|\.html$|\.json$|\.css/,
        threshold: 10240,
        minRatio: 0.8,
      }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 5,
      }),
    ],
  },
  chainWebpack: (config) => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
  },
  devServer: {
    port: 88,
    proxy: {
      '/api': {
        target: 'http://localhost:3737/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '',
        },
      },
      '/idp': {
        target: 'http://47.98.230.128:10086',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/idp': '',
        },
      },
    },
  },
})

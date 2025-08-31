const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  transpileDependencies: true,

  css: {
    loaderOptions: {
      sass: {
        // Enable modern Sass features
        additionalData: `@use "sass:math"; @use "sass:color";`
      }
    }
  },

  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm-bundler.js'
      }
    }
  },

  chainWebpack: (config) => {
    config.plugin('define').tap((args) => {
      args[0] = {
        ...args[0],
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false 
      };
      return args;
    });
  }
});
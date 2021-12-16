module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
              @import "~@/libs/style/variables.scss";
              @import "~@/libs/style/mixin.scss";
              @import "~@/assets/styles/global.scss";
            `,
      },
    },
  },
  devServer: {
    overlay: {
      warnings: true, //不显示警告
      errors: true, //不显示错误
    },
  },
  lintOnSave: false,
};

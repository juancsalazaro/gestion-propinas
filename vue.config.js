const path = require("path");
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    // Agregar alias para referenciar la carpeta src
    config.resolve.alias.set("@", path.resolve(__dirname, "src"));

    // Agregar regla para manejar archivos TypeScript
    config.module
      .rule("typescript")
      .test(/\.tsx?$/)
      .use("ts-loader")
      .loader("ts-loader")
      .options({
        appendTsSuffixTo: [/\.vue$/],
      })
      .end();
  },
});

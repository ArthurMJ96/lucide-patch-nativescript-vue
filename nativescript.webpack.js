const path = require("path");

module.exports = (webpack) => {
  webpack.chainWebpack((config) => {
    // Create a new rule for files coming from the specific package.
    config.module
      .rule("override-vue-for-server-renderer")
      .test(/\.(js|vue)$/)
      .include.add(
        path.resolve(__dirname, "../../../", "node_modules", "@vue", "server-renderer")
      )
      .end()
      // Override the resolution so that any import of "vue" in @vue/server-renderer files points to the original Vue package
      .resolve.alias.set("vue", path.resolve(__dirname, "../../../", "node_modules/vue"));
  });
};

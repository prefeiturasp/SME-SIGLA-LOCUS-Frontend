module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" }, modules: "commonjs" }],
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-typescript",
  ],
  plugins: [
    function importMetaParaTeste() {
      return {
        visitor: {
          MetaProperty(path) {
            const { meta, property } = path.node;
            if (meta.name === "import" && property.name === "meta") {
              path.replaceWithSourceString("({ env: process.env })");
            }
          },
        },
      };
    },
  ],
};

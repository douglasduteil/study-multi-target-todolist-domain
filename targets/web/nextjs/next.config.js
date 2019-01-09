//

const flow = require("lodash.flow");
const withTypescript = require("@zeit/next-typescript");
const withTranspileModules = require("next-plugin-transpile-modules");

//

module.exports = flow(
  withTypescript,
  withTranspileModules
)({
  transpileModules: ["@todolist/databases.lowdb", "@todolist/ui.nextjs"],
  webpack: flow(withPolyfills)
});

//

/**
 * With Polyfills
 * following https://github.com/zeit/next.js/blob/7.0.2/examples/with-polyfills/next.config.js
 */
function withPolyfills(cfg) {
  const originalEntry = cfg.entry;
  cfg.entry = async () => {
    const entries = await originalEntry();

    if (
      entries["main.js"] &&
      !entries["main.js"].includes("./src/polyfills.ts")
    ) {
      entries["main.js"].unshift("./src/polyfills.ts");
    }

    return entries;
  };

  return cfg;
}

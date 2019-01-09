//
//

(async () => {
  await import("./polyfills").then(({ polyfill }) => polyfill());
  await import("./main").then(({ bootstrap }) => bootstrap());
})();

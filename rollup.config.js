import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";

const config = {
  input: "src/index.js",
  external: [
    "@emotion/cache",
    "@emotion/core",
    "prop-types",
    "react",
  ],
  output: {
    format: "umd",
    name: "@small-multiples/emotion-sandbox",
  },
  plugins: [
    babel({
      exclude: "node_modules/**",
    }),
    resolve(),
  ],
};

export default config;

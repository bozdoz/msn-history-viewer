import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";

const isProduction = process.env.NODE_ENV === "production";

export default () => ({
	input: "src/index.jsx",
	output: {
		file: "build/js/index.js",
		format: "cjs",
	},
	plugins: [
		nodeResolve({
			extensions: [".js", ".jsx"],
		}),
		commonjs(),
		babel({
			exclude: "node_modules/**",
			babelHelpers: "runtime",
		}),
		isProduction && require("rollup-plugin-terser").terser(),
	],
});

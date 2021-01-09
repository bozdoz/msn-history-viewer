import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";

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
		replace({
			"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
		}),
		commonjs(),
		babel({
			exclude: "node_modules/**",
			babelHelpers: "runtime",
		}),
		isProduction && require("rollup-plugin-terser").terser(),
	],
});

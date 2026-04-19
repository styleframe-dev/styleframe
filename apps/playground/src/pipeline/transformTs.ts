import { getEsbuild } from "./esbuild";

export async function transformTs(source: string): Promise<string> {
	const esbuild = await getEsbuild();
	const result = await esbuild.transform(source, {
		loader: "ts",
		format: "esm",
		target: "es2022",
		sourcemap: false,
	});
	return result.code;
}

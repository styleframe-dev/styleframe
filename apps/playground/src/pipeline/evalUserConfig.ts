import type { Styleframe } from "@styleframe/core";
import { styleframe as styleframeFactory } from "styleframe";
import * as themeExports from "@styleframe/theme";

type ModuleShape = Record<string, unknown> & { default?: unknown };

const moduleShims: Record<string, ModuleShape> = {
	styleframe: { styleframe: styleframeFactory, default: styleframeFactory },
	"@styleframe/core": {
		styleframe: styleframeFactory,
		default: styleframeFactory,
	},
	"@styleframe/theme": themeExports as unknown as ModuleShape,
};

function rewriteImports(source: string): string {
	const output: string[] = [];
	let captured: unknown;
	void captured;

	const namedImportRe = /import\s*\{([^}]+)\}\s*from\s*["']([^"']+)["'];?/g;
	const defaultNamedImportRe =
		/import\s+(\w+)\s*,\s*\{([^}]+)\}\s*from\s*["']([^"']+)["'];?/g;
	const defaultImportRe = /import\s+(\w+)\s+from\s*["']([^"']+)["'];?/g;
	const namespaceImportRe =
		/import\s*\*\s*as\s+(\w+)\s+from\s*["']([^"']+)["'];?/g;
	const sideEffectImportRe = /import\s*["']([^"']+)["'];?/g;

	let rewritten = source
		.replace(defaultNamedImportRe, (_match, defaultName, names, spec) => {
			const bindings = (names as string)
				.split(",")
				.map((b) => b.trim())
				.filter(Boolean)
				.map((b) => {
					const [imported, alias] = b.split(/\s+as\s+/).map((x) => x.trim());
					return alias ? `${imported}: ${alias}` : imported;
				})
				.join(", ");
			return `const ${defaultName} = __pgModules[${JSON.stringify(spec)}].default; const { ${bindings} } = __pgModules[${JSON.stringify(spec)}];`;
		})
		.replace(namedImportRe, (_match, names, spec) => {
			const bindings = (names as string)
				.split(",")
				.map((b) => b.trim())
				.filter(Boolean)
				.map((b) => {
					const [imported, alias] = b.split(/\s+as\s+/).map((x) => x.trim());
					return alias ? `${imported}: ${alias}` : imported;
				})
				.join(", ");
			return `const { ${bindings} } = __pgModules[${JSON.stringify(spec)}];`;
		})
		.replace(namespaceImportRe, (_match, name, spec) => {
			return `const ${name} = __pgModules[${JSON.stringify(spec)}];`;
		})
		.replace(defaultImportRe, (_match, name, spec) => {
			return `const ${name} = __pgModules[${JSON.stringify(spec)}].default;`;
		})
		.replace(sideEffectImportRe, () => "")
		.replace(/export\s+default\s+/g, "__pgOutput.default = ")
		.replace(/export\s*\{([^}]+)\};?/g, (_m, names) => {
			const entries = (names as string)
				.split(",")
				.map((b) => b.trim())
				.filter(Boolean)
				.map((b) => {
					const [local, exported] = b.split(/\s+as\s+/).map((x) => x.trim());
					return `__pgOutput[${JSON.stringify(exported ?? local)}] = ${local};`;
				})
				.join("\n");
			return entries;
		})
		.replace(/export\s+const\s+(\w+)\s*=/g, "const $1 = __pgOutput.$1 =");

	output.push(rewritten);
	return output.join("\n");
}

export async function evalUserConfig(compiledJs: string): Promise<Styleframe> {
	const rewritten = rewriteImports(compiledJs);
	const wrapped = `"use strict";\nconst __pgOutput = {};\n${rewritten}\nreturn __pgOutput;`;
	const fn = new Function("__pgModules", wrapped) as (
		modules: Record<string, ModuleShape>,
	) => Record<string, unknown>;
	const exports = fn(moduleShims);
	const candidate = (exports.default ?? exports["default"]) as
		| Styleframe
		| undefined;
	if (!candidate || typeof candidate !== "object" || !("root" in candidate)) {
		throw new Error(
			"styleframe.config.ts must export a Styleframe instance as its default export.",
		);
	}
	return candidate;
}

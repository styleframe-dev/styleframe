import {
	compileScript,
	compileTemplate,
	parse,
	rewriteDefault,
} from "@vue/compiler-sfc";
import { transformTs } from "./transformTs";

export interface CompiledSfc {
	code: string;
}

function hashId(filename: string): string {
	let hash = 5381;
	for (let i = 0; i < filename.length; i++) {
		hash = (hash * 33) ^ filename.charCodeAt(i);
	}
	return `pg-${(hash >>> 0).toString(36)}`;
}

export async function compileVueSfc(
	source: string,
	filename: string,
): Promise<CompiledSfc> {
	const { descriptor, errors } = parse(source, { filename });
	if (errors.length > 0) {
		throw new Error(errors.map((e) => e.message).join("\n"));
	}

	const id = hashId(filename);
	const hasScoped = descriptor.styles.some((s) => s.scoped);

	let scriptCode = "";
	let scriptLang: string | undefined;
	if (descriptor.script || descriptor.scriptSetup) {
		const compiled = compileScript(descriptor, {
			id,
			inlineTemplate: false,
			genDefaultAs: "__sfc__",
		});
		scriptCode = compiled.content;
		scriptLang =
			compiled.lang ?? descriptor.scriptSetup?.lang ?? descriptor.script?.lang;
	} else {
		scriptCode = "const __sfc__ = {};";
	}

	let renderCode = "";
	if (descriptor.template) {
		const compiled = compileTemplate({
			source: descriptor.template.content,
			filename,
			id,
			scoped: hasScoped,
			isProd: false,
			compilerOptions: { bindingMetadata: undefined },
		});
		if (compiled.errors.length > 0) {
			const messages = compiled.errors.map((e) =>
				typeof e === "string" ? e : e.message,
			);
			throw new Error(messages.join("\n"));
		}
		renderCode = compiled.code.replace(
			/export (function|const) (render|ssrRender)/,
			"$1 _sfc_$2",
		);
	}

	let combined = rewriteDefault(scriptCode, "__sfc__");
	combined += "\n" + renderCode + "\n";
	if (descriptor.template) {
		combined += `__sfc__.render = _sfc_render;\n`;
	}
	combined += `__sfc__.__file = ${JSON.stringify(filename)};\n`;
	combined += `export default __sfc__;\n`;

	if (scriptLang === "ts" || scriptLang === "tsx") {
		combined = await transformTs(combined);
	}

	return { code: combined };
}

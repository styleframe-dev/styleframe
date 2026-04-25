import { describe, expect, it } from "vitest";
import { buildSrcdoc } from "@/pipeline/buildSrcdoc";

describe("buildSrcdoc", () => {
	it("embeds CSS, importmap, and the boot script", () => {
		const { srcdoc, revoke } = buildSrcdoc({
			css: ".pg-card{color:red}",
			configCode: "export const card = () => 'card';",
			appCode:
				"import Component from './Component.vue'; export default { render(){} };",
			componentCode: "export default { render(){} };",
			vueUrl: "/vendor/vue.esm-browser.js",
			runtimeUrl: "/vendor/styleframe-runtime.esm.js",
		});

		expect(srcdoc).toContain(".pg-card{color:red}");
		expect(srcdoc).toContain('<script type="importmap">');
		expect(srcdoc).toContain("/vendor/vue.esm-browser.js");
		expect(srcdoc).toContain("/vendor/styleframe-runtime.esm.js");
		// boot script is injected as a separate module URL
		expect(srcdoc).toMatch(/<script type="module" src=/);

		revoke();
	});

	it("rewrites the Component.vue specifier to a blob URL", () => {
		const componentSource =
			"globalThis.__loaded = (globalThis.__loaded ?? 0) + 1;";
		const appSource = `import Component from "./Component.vue";\nexport default Component;`;

		const { srcdoc, revoke } = buildSrcdoc({
			css: "",
			configCode: "",
			appCode: appSource,
			componentCode: componentSource,
			vueUrl: "/v",
			runtimeUrl: "/r",
		});

		expect(srcdoc).not.toContain('from "./Component.vue"');
		revoke();
	});
});

import { describe, expect, it } from "vitest";
import { buildSrcdoc } from "@/pipeline/buildSrcdoc";

describe("buildSrcdoc", () => {
	it("embeds CSS, importmap, and the boot script", () => {
		const { srcdoc, revoke } = buildSrcdoc({
			css: ".pg-card{color:red}",
			configCode: "export const card = () => 'card';",
			appCode:
				"import Card from './Card.vue'; import Button from './Button.vue'; export default { render(){} };",
			cardCode: "export default { render(){} };",
			buttonCode: "export default { render(){} };",
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

	it("rewrites Card.vue and Button.vue specifiers to blob URLs", () => {
		const cardSource = "export default { render(){} };";
		const buttonSource = "export default { render(){} };";
		const appSource = `import Card from "./Card.vue";\nimport Button from "./Button.vue";\nexport default Card;`;

		const { srcdoc, revoke } = buildSrcdoc({
			css: "",
			configCode: "",
			appCode: appSource,
			cardCode: cardSource,
			buttonCode: buttonSource,
			vueUrl: "/v",
			runtimeUrl: "/r",
		});

		expect(srcdoc).not.toContain('from "./Card.vue"');
		expect(srcdoc).not.toContain('from "./Button.vue"');
		revoke();
	});
});

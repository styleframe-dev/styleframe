import { describe, expect, it } from "vitest";
import { evalUserConfig } from "@/pipeline/evalUserConfig";

describe("evalUserConfig", () => {
	it("returns the default-exported Styleframe instance", async () => {
		const compiled = `
			const { styleframe } = __pgModules["styleframe"];
			const s = styleframe();
			__pgOutput.default = s;
		`;
		const instance = await evalUserConfig(compiled);
		expect(instance).toBeTruthy();
		expect(instance.root).toBeTruthy();
	});

	it("rewrites named imports to destructuring assignments", async () => {
		const compiled = `
			import { styleframe } from "styleframe";
			import {
				useDesignTokensPreset,
				useUtilitiesPreset,
				useModifiersPreset,
				useCardRecipe,
			} from "@styleframe/theme";
			const s = styleframe();
			useDesignTokensPreset(s);
			useUtilitiesPreset(s);
			useModifiersPreset(s);
			const card = useCardRecipe(s);
			export default s;
		`;
		const instance = await evalUserConfig(compiled);
		expect(instance.root.recipes.length).toBeGreaterThan(0);
	});

	it("throws when the default export is missing", async () => {
		const compiled = `const foo = 1;`;
		await expect(evalUserConfig(compiled)).rejects.toThrow(
			/must export a Styleframe instance/i,
		);
	});
});

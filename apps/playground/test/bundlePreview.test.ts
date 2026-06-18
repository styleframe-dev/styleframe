import { beforeAll, describe, expect, it, vi } from "vitest";
import { initRealEsbuild } from "./helpers/esbuild";

vi.mock("@/pipeline/esbuild", () => ({
	getEsbuild: () => initRealEsbuild(),
}));

vi.mock("virtual:pg-react-vendor", () => ({
	default: {
		iife: "globalThis.PGReactVendor = {};",
		reactKeys: ["useState"],
		reactDomClientKeys: ["createRoot"],
		jsxRuntimeKeys: ["jsx", "jsxs", "Fragment"],
	},
}));

vi.mock("virtual:pg-runtime-src", () => ({
	default: "export const createRecipe = (name) => () => name;",
}));

describe("bundlePreview", () => {
	beforeAll(async () => {
		await initRealEsbuild();
	});

	it("bundles the entry, cross-file imports, and virtual:styleframe", async () => {
		const { bundlePreview } = await import("@/pipeline/bundlePreview");

		const result = await bundlePreview({
			files: {
				"styleframe.config.ts": "export default {};",
				"App.tsx": `import Button from "./Button";\nimport { card } from "virtual:styleframe";\nexport default function App(){ return <div className={card()}><Button/></div>; }`,
				"Button.tsx": `import { button } from "virtual:styleframe";\nexport default function Button(){ return <button className={button()}>Hi</button>; }`,
			},
			entryPath: "App.tsx",
			configPath: "styleframe.config.ts",
			runtimeTs: `import { createRecipe } from "@styleframe/runtime";\nexport const card = createRecipe("card", {});\nexport const button = createRecipe("button", {});`,
		});

		// Cross-file import is inlined.
		expect(result.bundleJs).toContain("function Button");
		// React is read off the vendor global, not imported as a bare module.
		expect(result.bundleJs).toContain("PGReactVendor");
		expect(result.bundleJs).not.toMatch(/from\s*"react"/);
		// virtual:styleframe resolves to the generated runtime module.
		expect(result.bundleJs).not.toContain('"virtual:styleframe"');
		expect(result.reactIife).toBe("globalThis.PGReactVendor = {};");
	});

	it("rejects when a relative import cannot be resolved", async () => {
		const { bundlePreview } = await import("@/pipeline/bundlePreview");

		await expect(
			bundlePreview({
				files: {
					"App.tsx": `import X from "./missing";\nexport default function App(){ return <X />; }`,
				},
				entryPath: "App.tsx",
				configPath: "styleframe.config.ts",
				runtimeTs: "",
			}),
		).rejects.toThrow();
	});
});

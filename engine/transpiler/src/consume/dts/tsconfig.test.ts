import { generateTsconfig } from "./tsconfig";

describe("generateTsconfig (dts)", () => {
	it("should map virtual:styleframe imports to styleframe.d.ts", () => {
		const config = JSON.parse(generateTsconfig());

		expect(config.compilerOptions.paths).toEqual({
			"virtual:styleframe": ["./styleframe.d.ts"],
		});
	});

	it("should include the ambient shims file", () => {
		const config = JSON.parse(generateTsconfig());

		expect(config.include).toEqual(["./shims.d.ts"]);
	});

	it("should emit valid JSON terminated by a newline", () => {
		const output = generateTsconfig();

		expect(output.endsWith("\n")).toBe(true);
		expect(() => JSON.parse(output)).not.toThrow();
	});
});

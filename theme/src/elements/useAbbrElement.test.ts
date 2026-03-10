import { styleframe } from "@styleframe/core";
import { consumeCSS } from "@styleframe/transpiler";
import { useAbbrElement } from "./useAbbrElement";

describe("useAbbrElement", () => {
	it("should create abbr selector", () => {
		const s = styleframe();
		useAbbrElement(s);

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain("abbr[title]");
		expect(css).toContain("cursor: help");
	});
});

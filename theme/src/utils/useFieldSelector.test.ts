import { styleframe } from "@styleframe/core";
import { useFieldSelector } from "./useFieldSelector";

function createInstance() {
	const s = styleframe();
	s.variable("color.text-weakest", "#64748B", { default: true });
	return s;
}

describe("useFieldSelector", () => {
	function findSelector(s: ReturnType<typeof styleframe>, query: string) {
		return s.root.children.find(
			(child) =>
				child.type === "selector" &&
				(child as { query: string }).query === query,
		) as
			| {
					type: "selector";
					query: string;
					declarations: Record<string, unknown>;
			  }
			| undefined;
	}

	it("should register a selector with the given query", () => {
		const s = createInstance();
		useFieldSelector(s, ".input-field");

		expect(findSelector(s, ".input-field")).toBeDefined();
	});

	it("should target whatever field query it is given", () => {
		const s = createInstance();
		useFieldSelector(s, ".textarea-field");

		expect(findSelector(s, ".textarea-field")).toBeDefined();
		expect(findSelector(s, ".input-field")).toBeUndefined();
	});

	it("should apply a transparent, borderless reset", () => {
		const s = createInstance();
		useFieldSelector(s, ".input-field");

		expect(findSelector(s, ".input-field")?.declarations).toMatchObject({
			width: "100%",
			background: "transparent",
			border: "none",
			padding: "0",
		});
	});
});

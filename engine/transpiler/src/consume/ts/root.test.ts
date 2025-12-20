import type { Root, StyleframeOptions } from "@styleframe/core";
import { createRecipeFunction, createRoot } from "@styleframe/core";
import { consume } from "./consume";
import { createRootConsumer } from "./root";

describe("createRootConsumer", () => {
	let root: Root;
	let recipe: ReturnType<typeof createRecipeFunction>;

	const consumeRoot = createRootConsumer(consume);
	const options: StyleframeOptions = {};

	beforeEach(() => {
		root = createRoot();
		recipe = createRecipeFunction(root, root);
	});

	it("should handle root with no recipes", () => {
		const result = consumeRoot(root, options);

		expect(result).toEqual("");
	});

	it("should handle root with single recipe", () => {
		recipe({
			name: "button",
			base: { borderWidth: "thin", borderStyle: "solid", cursor: "pointer" },
			variants: {
				color: {
					primary: { background: "primary", color: "white" },
					secondary: { background: "secondary", color: "white" },
				},
			},
		});

		const result = consumeRoot(root, options);

		// Since no utilities are registered, _runtime will have empty objects
		expect(result).toEqual(`import { createRecipe } from '@styleframe/runtime';
import type { RecipeRuntime } from '@styleframe/runtime';

const buttonRecipe: RecipeRuntime = {
    "base": {},
    "variants": {
        "color": {
            "primary": {},
            "secondary": {}
        }
    }
};

export const button = createRecipe("button", buttonRecipe);
`);
	});

	it("should handle root with multiple recipes", () => {
		recipe({
			name: "button",
			base: { cursor: "pointer" },
			variants: {
				variant: {
					primary: { background: "blue" },
					secondary: { background: "gray" },
				},
			},
		});

		recipe({
			name: "card",
			base: { borderRadius: "4px" },
			variants: {
				elevation: {
					low: { boxShadow: "0 1px 2px rgba(0,0,0,0.1)" },
					high: { boxShadow: "0 4px 8px rgba(0,0,0,0.2)" },
				},
			},
		});

		const result = consumeRoot(root, options);

		expect(result).toEqual(`import { createRecipe } from '@styleframe/runtime';
import type { RecipeRuntime } from '@styleframe/runtime';

const buttonRecipe: RecipeRuntime = {
    "base": {},
    "variants": {
        "variant": {
            "primary": {},
            "secondary": {}
        }
    }
};

export const button = createRecipe("button", buttonRecipe);

const cardRecipe: RecipeRuntime = {
    "base": {},
    "variants": {
        "elevation": {
            "low": {},
            "high": {}
        }
    }
};

export const card = createRecipe("card", cardRecipe);
`);
	});

	it("should handle recipe with defaultVariants", () => {
		recipe({
			name: "chip",
			base: { borderWidth: "thin" },
			variants: {
				variant: {
					filled: { background: "primary", color: "white" },
					outline: { background: "transparent", color: "primary" },
				},
				size: {
					sm: { padding: "0.25rem" },
					md: { padding: "0.5rem" },
				},
			},
			defaultVariants: { variant: "filled", size: "sm" },
		});

		const result = consumeRoot(root, options);

		expect(result).toEqual(`import { createRecipe } from '@styleframe/runtime';
import type { RecipeRuntime } from '@styleframe/runtime';

const chipRecipe: RecipeRuntime = {
    "base": {},
    "variants": {
        "variant": {
            "filled": {},
            "outline": {}
        },
        "size": {
            "sm": {},
            "md": {}
        }
    },
    "defaultVariants": {
        "variant": "filled",
        "size": "sm"
    }
};

export const chip = createRecipe("chip", chipRecipe);
`);
	});

	it("should handle recipe with compoundVariants", () => {
		recipe({
			name: "badge",
			base: { display: "inline-block" },
			variants: {
				variant: {
					solid: { background: "blue" },
					outline: { border: "1px solid" },
				},
				size: {
					sm: { padding: "2px 4px" },
					lg: { padding: "4px 8px" },
				},
			},
			compoundVariants: [
				{
					match: { variant: "solid", size: "sm" },
					css: { fontSize: "12px" },
				},
			],
		});

		const result = consumeRoot(root, options);

		expect(result).toEqual(`import { createRecipe } from '@styleframe/runtime';
import type { RecipeRuntime } from '@styleframe/runtime';

const badgeRecipe: RecipeRuntime = {
    "base": {},
    "variants": {
        "variant": {
            "solid": {},
            "outline": {}
        },
        "size": {
            "sm": {},
            "lg": {}
        }
    },
    "compoundVariants": [
        {
            "match": {
                "variant": "solid",
                "size": "sm"
            },
            "css": {}
        }
    ]
};

export const badge = createRecipe("badge", badgeRecipe);
`);
	});

	it("should handle recipe with both defaultVariants and compoundVariants", () => {
		recipe({
			name: "input",
			base: { borderWidth: "1px" },
			variants: {
				variant: {
					filled: { background: "gray" },
					outline: { background: "transparent" },
				},
				size: {
					sm: { height: "32px" },
					lg: { height: "48px" },
				},
			},
			defaultVariants: { variant: "outline", size: "sm" },
			compoundVariants: [
				{
					match: { variant: "filled", size: "lg" },
					css: { padding: "0 16px" },
				},
			],
		});

		const result = consumeRoot(root, options);

		expect(result).toEqual(`import { createRecipe } from '@styleframe/runtime';
import type { RecipeRuntime } from '@styleframe/runtime';

const inputRecipe: RecipeRuntime = {
    "base": {},
    "variants": {
        "variant": {
            "filled": {},
            "outline": {}
        },
        "size": {
            "sm": {},
            "lg": {}
        }
    },
    "defaultVariants": {
        "variant": "outline",
        "size": "sm"
    },
    "compoundVariants": [
        {
            "match": {
                "variant": "filled",
                "size": "lg"
            },
            "css": {}
        }
    ]
};

export const input = createRecipe("input", inputRecipe);
`);
	});

	it("should handle recipe with complex variant declarations", () => {
		recipe({
			name: "alert",
			base: {
				padding: "1rem",
				borderRadius: "4px",
				display: "flex",
				alignItems: "center",
			},
			variants: {
				severity: {
					info: {
						background: "#e3f2fd",
						color: "#0288d1",
						borderColor: "#0288d1",
					},
					warning: {
						background: "#fff3e0",
						color: "#f57c00",
						borderColor: "#f57c00",
					},
					error: {
						background: "#ffebee",
						color: "#d32f2f",
						borderColor: "#d32f2f",
					},
				},
			},
		});

		const result = consumeRoot(root, options);

		expect(result).toEqual(`import { createRecipe } from '@styleframe/runtime';
import type { RecipeRuntime } from '@styleframe/runtime';

const alertRecipe: RecipeRuntime = {
    "base": {},
    "variants": {
        "severity": {
            "info": {},
            "warning": {},
            "error": {}
        }
    }
};

export const alert = createRecipe("alert", alertRecipe);
`);
	});

	it("should handle empty base in recipe", () => {
		recipe({
			name: "minimal",
			base: {},
			variants: {
				size: {
					sm: { fontSize: "12px" },
					lg: { fontSize: "16px" },
				},
			},
		});

		const result = consumeRoot(root, options);

		expect(result).toEqual(`import { createRecipe } from '@styleframe/runtime';
import type { RecipeRuntime } from '@styleframe/runtime';

const minimalRecipe: RecipeRuntime = {
    "base": {},
    "variants": {
        "size": {
            "sm": {},
            "lg": {}
        }
    }
};

export const minimal = createRecipe("minimal", minimalRecipe);
`);
	});

	it("should handle empty variants in recipe", () => {
		recipe({
			name: "simple",
			base: { padding: "1rem", margin: "0" },
			variants: {},
		});

		const result = consumeRoot(root, options);

		expect(result).toEqual(`import { createRecipe } from '@styleframe/runtime';
import type { RecipeRuntime } from '@styleframe/runtime';

const simpleRecipe: RecipeRuntime = {
    "base": {},
    "variants": {}
};

export const simple = createRecipe("simple", simpleRecipe);
`);
	});

	it("should preserve recipe type information in output", () => {
		recipe({
			name: "myRecipe",
			base: { display: "block" },
			variants: {
				status: {
					active: { opacity: "1" },
					inactive: { opacity: "0.5" },
				},
			},
		});

		const result = consumeRoot(root, options);

		expect(result).toContain("RecipeRuntime");
		expect(result).toContain("const myRecipeRecipe: RecipeRuntime =");
		expect(result).toContain(
			`export const myRecipe = createRecipe("myRecipe", myRecipeRecipe);`,
		);
	});

	it("should handle recipe names with different casing", () => {
		recipe({
			name: "PascalCase",
			base: {},
			variants: { variant: { a: {}, b: {} } },
		});
		recipe({
			name: "camelCase",
			base: {},
			variants: { variant: { a: {}, b: {} } },
		});
		recipe({
			name: "kebab-case",
			base: {},
			variants: { variant: { a: {}, b: {} } },
		});

		const result = consumeRoot(root, options);

		expect(result).toEqual(`import { createRecipe } from '@styleframe/runtime';
import type { RecipeRuntime } from '@styleframe/runtime';

const PascalCaseRecipe: RecipeRuntime = {
    "base": {},
    "variants": {
        "variant": {
            "a": {},
            "b": {}
        }
    }
};

export const PascalCase = createRecipe("PascalCase", PascalCaseRecipe);

const camelCaseRecipe: RecipeRuntime = {
    "base": {},
    "variants": {
        "variant": {
            "a": {},
            "b": {}
        }
    }
};

export const camelCase = createRecipe("camelCase", camelCaseRecipe);

const kebabCaseRecipe: RecipeRuntime = {
    "base": {},
    "variants": {
        "variant": {
            "a": {},
            "b": {}
        }
    }
};

export const kebabCase = createRecipe("kebab-case", kebabCaseRecipe);
`);
	});

	it("should delegate to consume function for recipes array", () => {
		recipe({ name: "first", base: { padding: "1rem" }, variants: {} });
		recipe({ name: "second", base: { margin: "1rem" }, variants: {} });

		const result = consumeRoot(root, options);

		expect(result).toEqual(`import { createRecipe } from '@styleframe/runtime';
import type { RecipeRuntime } from '@styleframe/runtime';

const firstRecipe: RecipeRuntime = {
    "base": {},
    "variants": {}
};

export const first = createRecipe("first", firstRecipe);

const secondRecipe: RecipeRuntime = {
    "base": {},
    "variants": {}
};

export const second = createRecipe("second", secondRecipe);
`);
	});

	it("should work with custom options", () => {
		const customOptions: StyleframeOptions = {};

		recipe({ name: "customized", base: { display: "flex" }, variants: {} });

		const result = consumeRoot(root, customOptions);

		expect(result).toEqual(`import { createRecipe } from '@styleframe/runtime';
import type { RecipeRuntime } from '@styleframe/runtime';

const customizedRecipe: RecipeRuntime = {
    "base": {},
    "variants": {}
};

export const customized = createRecipe("customized", customizedRecipe);
`);
	});

	it("should maintain proper structure with imports and exports", () => {
		recipe({
			name: "structured",
			base: {},
			variants: { size: { sm: {}, lg: {} } },
		});

		const result = consumeRoot(root, options);

		expect(result).toEqual(`import { createRecipe } from '@styleframe/runtime';
import type { RecipeRuntime } from '@styleframe/runtime';

const structuredRecipe: RecipeRuntime = {
    "base": {},
    "variants": {
        "size": {
            "sm": {},
            "lg": {}
        }
    }
};

export const structured = createRecipe("structured", structuredRecipe);
`);
	});
});

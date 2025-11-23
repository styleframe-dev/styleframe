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
		recipe(
			"button",
			{ borderWidth: "thin", borderStyle: "solid", cursor: "pointer" },
			{
				color: {
					primary: { background: "primary", color: "white" },
					secondary: { background: "secondary", color: "white" },
				},
			},
		);

		const result = consumeRoot(root, options);

		expect(result).toEqual(`import { createRecipe } from '@styleframe/runtime';
import type { Recipe } from '@styleframe/runtime';

const buttonRecipe: Recipe = {
    "type": "recipe",
    "name": "button",
    "defaults": {
        "borderWidth": "thin",
        "borderStyle": "solid",
        "cursor": "pointer"
    },
    "variants": {
        "color": {
            "primary": {
                "background": "primary",
                "color": "white"
            },
            "secondary": {
                "background": "secondary",
                "color": "white"
            }
        }
    }
};

export const button = createRecipe(buttonRecipe);
`);
	});

	it("should handle root with multiple recipes", () => {
		recipe(
			"button",
			{ cursor: "pointer" },
			{
				variant: {
					primary: { background: "blue" },
					secondary: { background: "gray" },
				},
			},
		);

		recipe(
			"card",
			{ borderRadius: "4px" },
			{
				elevation: {
					low: { boxShadow: "0 1px 2px rgba(0,0,0,0.1)" },
					high: { boxShadow: "0 4px 8px rgba(0,0,0,0.2)" },
				},
			},
		);

		const result = consumeRoot(root, options);

		expect(result).toEqual(`import { createRecipe } from '@styleframe/runtime';
import type { Recipe } from '@styleframe/runtime';

const buttonRecipe: Recipe = {
    "type": "recipe",
    "name": "button",
    "defaults": {
        "cursor": "pointer"
    },
    "variants": {
        "variant": {
            "primary": {
                "background": "blue"
            },
            "secondary": {
                "background": "gray"
            }
        }
    }
};

export const button = createRecipe(buttonRecipe);

const cardRecipe: Recipe = {
    "type": "recipe",
    "name": "card",
    "defaults": {
        "borderRadius": "4px"
    },
    "variants": {
        "elevation": {
            "low": {
                "boxShadow": "0 1px 2px rgba(0,0,0,0.1)"
            },
            "high": {
                "boxShadow": "0 4px 8px rgba(0,0,0,0.2)"
            }
        }
    }
};

export const card = createRecipe(cardRecipe);
`);
	});

	it("should handle recipe with defaultVariants", () => {
		recipe(
			"chip",
			{ borderWidth: "thin" },
			{
				variant: {
					filled: { background: "primary", color: "white" },
					outline: { background: "transparent", color: "primary" },
				},
				size: {
					sm: { padding: "0.25rem" },
					md: { padding: "0.5rem" },
				},
			},
			{
				defaultVariants: { variant: "filled", size: "sm" },
			},
		);

		const result = consumeRoot(root, options);

		expect(result).toEqual(`import { createRecipe } from '@styleframe/runtime';
import type { Recipe } from '@styleframe/runtime';

const chipRecipe: Recipe = {
    "type": "recipe",
    "name": "chip",
    "defaults": {
        "borderWidth": "thin"
    },
    "variants": {
        "variant": {
            "filled": {
                "background": "primary",
                "color": "white"
            },
            "outline": {
                "background": "transparent",
                "color": "primary"
            }
        },
        "size": {
            "sm": {
                "padding": "0.25rem"
            },
            "md": {
                "padding": "0.5rem"
            }
        }
    },
    "defaultVariants": {
        "variant": "filled",
        "size": "sm"
    }
};

export const chip = createRecipe(chipRecipe);
`);
	});

	it("should handle recipe with compoundVariants", () => {
		recipe(
			"badge",
			{ display: "inline-block" },
			{
				variant: {
					solid: { background: "blue" },
					outline: { border: "1px solid" },
				},
				size: {
					sm: { padding: "2px 4px" },
					lg: { padding: "4px 8px" },
				},
			},
			{
				compoundVariants: [
					{
						match: { variant: "solid", size: "sm" },
						declarations: { fontSize: "12px" },
					},
				],
			},
		);

		const result = consumeRoot(root, options);

		expect(result).toEqual(`import { createRecipe } from '@styleframe/runtime';
import type { Recipe } from '@styleframe/runtime';

const badgeRecipe: Recipe = {
    "type": "recipe",
    "name": "badge",
    "defaults": {
        "display": "inline-block"
    },
    "variants": {
        "variant": {
            "solid": {
                "background": "blue"
            },
            "outline": {
                "border": "1px solid"
            }
        },
        "size": {
            "sm": {
                "padding": "2px 4px"
            },
            "lg": {
                "padding": "4px 8px"
            }
        }
    },
    "compoundVariants": [
        {
            "match": {
                "variant": "solid",
                "size": "sm"
            },
            "declarations": {
                "fontSize": "12px"
            }
        }
    ]
};

export const badge = createRecipe(badgeRecipe);
`);
	});

	it("should handle recipe with both defaultVariants and compoundVariants", () => {
		recipe(
			"input",
			{ borderWidth: "1px" },
			{
				variant: {
					filled: { background: "gray" },
					outline: { background: "transparent" },
				},
				size: {
					sm: { height: "32px" },
					lg: { height: "48px" },
				},
			},
			{
				defaultVariants: { variant: "outline", size: "sm" },
				compoundVariants: [
					{
						match: { variant: "filled", size: "lg" },
						declarations: { padding: "0 16px" },
					},
				],
			},
		);

		const result = consumeRoot(root, options);

		expect(result).toEqual(`import { createRecipe } from '@styleframe/runtime';
import type { Recipe } from '@styleframe/runtime';

const inputRecipe: Recipe = {
    "type": "recipe",
    "name": "input",
    "defaults": {
        "borderWidth": "1px"
    },
    "variants": {
        "variant": {
            "filled": {
                "background": "gray"
            },
            "outline": {
                "background": "transparent"
            }
        },
        "size": {
            "sm": {
                "height": "32px"
            },
            "lg": {
                "height": "48px"
            }
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
            "declarations": {
                "padding": "0 16px"
            }
        }
    ]
};

export const input = createRecipe(inputRecipe);
`);
	});

	it("should handle recipe with complex variant declarations", () => {
		recipe(
			"alert",
			{
				padding: "1rem",
				borderRadius: "4px",
				display: "flex",
				alignItems: "center",
			},
			{
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
		);

		const result = consumeRoot(root, options);

		expect(result).toEqual(`import { createRecipe } from '@styleframe/runtime';
import type { Recipe } from '@styleframe/runtime';

const alertRecipe: Recipe = {
    "type": "recipe",
    "name": "alert",
    "defaults": {
        "padding": "1rem",
        "borderRadius": "4px",
        "display": "flex",
        "alignItems": "center"
    },
    "variants": {
        "severity": {
            "info": {
                "background": "#e3f2fd",
                "color": "#0288d1",
                "borderColor": "#0288d1"
            },
            "warning": {
                "background": "#fff3e0",
                "color": "#f57c00",
                "borderColor": "#f57c00"
            },
            "error": {
                "background": "#ffebee",
                "color": "#d32f2f",
                "borderColor": "#d32f2f"
            }
        }
    }
};

export const alert = createRecipe(alertRecipe);
`);
	});

	it("should handle empty defaults in recipe", () => {
		recipe(
			"minimal",
			{},
			{
				size: {
					sm: { fontSize: "12px" },
					lg: { fontSize: "16px" },
				},
			},
		);

		const result = consumeRoot(root, options);

		expect(result).toEqual(`import { createRecipe } from '@styleframe/runtime';
import type { Recipe } from '@styleframe/runtime';

const minimalRecipe: Recipe = {
    "type": "recipe",
    "name": "minimal",
    "defaults": {},
    "variants": {
        "size": {
            "sm": {
                "fontSize": "12px"
            },
            "lg": {
                "fontSize": "16px"
            }
        }
    }
};

export const minimal = createRecipe(minimalRecipe);
`);
	});

	it("should handle empty variants in recipe", () => {
		recipe("simple", { padding: "1rem", margin: "0" }, {});

		const result = consumeRoot(root, options);

		expect(result).toEqual(`import { createRecipe } from '@styleframe/runtime';
import type { Recipe } from '@styleframe/runtime';

const simpleRecipe: Recipe = {
    "type": "recipe",
    "name": "simple",
    "defaults": {
        "padding": "1rem",
        "margin": "0"
    },
    "variants": {}
};

export const simple = createRecipe(simpleRecipe);
`);
	});

	it("should preserve recipe type information in output", () => {
		recipe(
			"myRecipe",
			{ display: "block" },
			{
				status: {
					active: { opacity: "1" },
					inactive: { opacity: "0.5" },
				},
			},
		);

		const result = consumeRoot(root, options);

		expect(result).toEqual(`import { createRecipe } from '@styleframe/runtime';
import type { Recipe } from '@styleframe/runtime';

const myRecipeRecipe: Recipe = {
    "type": "recipe",
    "name": "myRecipe",
    "defaults": {
        "display": "block"
    },
    "variants": {
        "status": {
            "active": {
                "opacity": "1"
            },
            "inactive": {
                "opacity": "0.5"
            }
        }
    }
};

export const myRecipe = createRecipe(myRecipeRecipe);
`);
	});

	it("should handle recipe names with different casing", () => {
		recipe("PascalCase", {}, { variant: { a: {}, b: {} } });
		recipe("camelCase", {}, { variant: { a: {}, b: {} } });
		recipe("kebab-case", {}, { variant: { a: {}, b: {} } });

		const result = consumeRoot(root, options);

		expect(result).toEqual(`import { createRecipe } from '@styleframe/runtime';
import type { Recipe } from '@styleframe/runtime';

const PascalCaseRecipe: Recipe = {
    "type": "recipe",
    "name": "PascalCase",
    "defaults": {},
    "variants": {
        "variant": {
            "a": {},
            "b": {}
        }
    }
};

export const PascalCase = createRecipe(PascalCaseRecipe);

const camelCaseRecipe: Recipe = {
    "type": "recipe",
    "name": "camelCase",
    "defaults": {},
    "variants": {
        "variant": {
            "a": {},
            "b": {}
        }
    }
};

export const camelCase = createRecipe(camelCaseRecipe);

const kebabCaseRecipe: Recipe = {
    "type": "recipe",
    "name": "kebab-case",
    "defaults": {},
    "variants": {
        "variant": {
            "a": {},
            "b": {}
        }
    }
};

export const kebabCase = createRecipe(kebabCaseRecipe);
`);
	});

	it("should delegate to consume function for recipes array", () => {
		recipe("first", { padding: "1rem" }, {});
		recipe("second", { margin: "1rem" }, {});

		const result = consumeRoot(root, options);

		expect(result).toEqual(`import { createRecipe } from '@styleframe/runtime';
import type { Recipe } from '@styleframe/runtime';

const firstRecipe: Recipe = {
    "type": "recipe",
    "name": "first",
    "defaults": {
        "padding": "1rem"
    },
    "variants": {}
};

export const first = createRecipe(firstRecipe);

const secondRecipe: Recipe = {
    "type": "recipe",
    "name": "second",
    "defaults": {
        "margin": "1rem"
    },
    "variants": {}
};

export const second = createRecipe(secondRecipe);
`);
	});

	it("should work with custom options", () => {
		const customOptions: StyleframeOptions = {};

		recipe("customized", { display: "flex" }, {});

		const result = consumeRoot(root, customOptions);

		expect(result).toEqual(`import { createRecipe } from '@styleframe/runtime';
import type { Recipe } from '@styleframe/runtime';

const customizedRecipe: Recipe = {
    "type": "recipe",
    "name": "customized",
    "defaults": {
        "display": "flex"
    },
    "variants": {}
};

export const customized = createRecipe(customizedRecipe);
`);
	});

	it("should maintain proper structure with imports and exports", () => {
		recipe("structured", {}, { size: { sm: {}, lg: {} } });

		const result = consumeRoot(root, options);

		expect(result).toEqual(`import { createRecipe } from '@styleframe/runtime';
import type { Recipe } from '@styleframe/runtime';

const structuredRecipe: Recipe = {
    "type": "recipe",
    "name": "structured",
    "defaults": {},
    "variants": {
        "size": {
            "sm": {},
            "lg": {}
        }
    }
};

export const structured = createRecipe(structuredRecipe);
`);
	});
});

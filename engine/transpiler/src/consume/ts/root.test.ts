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

		expect(result).toEqual(`import { createRecipe } from '@styleframe/runtime';
import type { Recipe } from '@styleframe/runtime';

const buttonRecipe: Recipe = {
    "type": "recipe",
    "name": "button",
    "base": {
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
import type { Recipe } from '@styleframe/runtime';

const buttonRecipe: Recipe = {
    "type": "recipe",
    "name": "button",
    "base": {
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
    "base": {
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
import type { Recipe } from '@styleframe/runtime';

const chipRecipe: Recipe = {
    "type": "recipe",
    "name": "chip",
    "base": {
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
import type { Recipe } from '@styleframe/runtime';

const badgeRecipe: Recipe = {
    "type": "recipe",
    "name": "badge",
    "base": {
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
            "css": {
                "fontSize": "12px"
            }
        }
    ]
};

export const badge = createRecipe(badgeRecipe);
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
import type { Recipe } from '@styleframe/runtime';

const inputRecipe: Recipe = {
    "type": "recipe",
    "name": "input",
    "base": {
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
            "css": {
                "padding": "0 16px"
            }
        }
    ]
};

export const input = createRecipe(inputRecipe);
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
import type { Recipe } from '@styleframe/runtime';

const alertRecipe: Recipe = {
    "type": "recipe",
    "name": "alert",
    "base": {
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
import type { Recipe } from '@styleframe/runtime';

const minimalRecipe: Recipe = {
    "type": "recipe",
    "name": "minimal",
    "base": {},
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
		recipe({
			name: "simple",
			base: { padding: "1rem", margin: "0" },
			variants: {},
		});

		const result = consumeRoot(root, options);

		expect(result).toEqual(`import { createRecipe } from '@styleframe/runtime';
import type { Recipe } from '@styleframe/runtime';

const simpleRecipe: Recipe = {
    "type": "recipe",
    "name": "simple",
    "base": {
        "padding": "1rem",
        "margin": "0"
    },
    "variants": {}
};

export const simple = createRecipe(simpleRecipe);
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

		expect(result).toEqual(`import { createRecipe } from '@styleframe/runtime';
import type { Recipe } from '@styleframe/runtime';

const myRecipeRecipe: Recipe = {
    "type": "recipe",
    "name": "myRecipe",
    "base": {
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
import type { Recipe } from '@styleframe/runtime';

const PascalCaseRecipe: Recipe = {
    "type": "recipe",
    "name": "PascalCase",
    "base": {},
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
    "base": {},
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
    "base": {},
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
		recipe({ name: "first", base: { padding: "1rem" }, variants: {} });
		recipe({ name: "second", base: { margin: "1rem" }, variants: {} });

		const result = consumeRoot(root, options);

		expect(result).toEqual(`import { createRecipe } from '@styleframe/runtime';
import type { Recipe } from '@styleframe/runtime';

const firstRecipe: Recipe = {
    "type": "recipe",
    "name": "first",
    "base": {
        "padding": "1rem"
    },
    "variants": {}
};

export const first = createRecipe(firstRecipe);

const secondRecipe: Recipe = {
    "type": "recipe",
    "name": "second",
    "base": {
        "margin": "1rem"
    },
    "variants": {}
};

export const second = createRecipe(secondRecipe);
`);
	});

	it("should work with custom options", () => {
		const customOptions: StyleframeOptions = {};

		recipe({ name: "customized", base: { display: "flex" }, variants: {} });

		const result = consumeRoot(root, customOptions);

		expect(result).toEqual(`import { createRecipe } from '@styleframe/runtime';
import type { Recipe } from '@styleframe/runtime';

const customizedRecipe: Recipe = {
    "type": "recipe",
    "name": "customized",
    "base": {
        "display": "flex"
    },
    "variants": {}
};

export const customized = createRecipe(customizedRecipe);
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
import type { Recipe } from '@styleframe/runtime';

const structuredRecipe: Recipe = {
    "type": "recipe",
    "name": "structured",
    "base": {},
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

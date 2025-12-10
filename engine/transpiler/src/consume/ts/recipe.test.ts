import type { Recipe, StyleframeOptions } from "@styleframe/core";
import { createRecipeConsumer } from "./recipe";

describe("createRecipeConsumer", () => {
	const mockConsume = vi.fn();
	const consumeRecipe = createRecipeConsumer(mockConsume);
	const options: StyleframeOptions = {};

	beforeEach(() => {
		mockConsume.mockClear();
	});

	it("should generate basic recipe with minimal configuration", () => {
		const recipe: Recipe = {
			type: "recipe",
			name: "button",
			base: { cursor: "pointer" },
			variants: {},
		};

		const result = consumeRecipe(recipe, options);

		expect(result).toEqual(`const buttonRecipe: Recipe = {
    "type": "recipe",
    "name": "button",
    "base": {
        "cursor": "pointer"
    },
    "variants": {}
};

export const button = createRecipe(buttonRecipe);
`);
	});

	it("should generate recipe with simple variants", () => {
		const recipe: Recipe = {
			type: "recipe",
			name: "button",
			base: { borderWidth: "thin", borderStyle: "solid" },
			variants: {
				color: {
					primary: { background: "blue", color: "white" },
					secondary: { background: "gray", color: "white" },
				},
			},
		};

		const result = consumeRecipe(recipe, options);

		expect(result).toEqual(`const buttonRecipe: Recipe = {
    "type": "recipe",
    "name": "button",
    "base": {
        "borderWidth": "thin",
        "borderStyle": "solid"
    },
    "variants": {
        "color": {
            "primary": {
                "background": "blue",
                "color": "white"
            },
            "secondary": {
                "background": "gray",
                "color": "white"
            }
        }
    }
};

export const button = createRecipe(buttonRecipe);
`);
	});

	it("should generate recipe with multiple variant groups", () => {
		const recipe: Recipe = {
			type: "recipe",
			name: "card",
			base: { display: "block" },
			variants: {
				variant: {
					elevated: { boxShadow: "0 2px 4px rgba(0,0,0,0.1)" },
					flat: { boxShadow: "none" },
				},
				size: {
					sm: { padding: "0.5rem" },
					md: { padding: "1rem" },
					lg: { padding: "1.5rem" },
				},
			},
		};

		const result = consumeRecipe(recipe, options);

		expect(result).toEqual(`const cardRecipe: Recipe = {
    "type": "recipe",
    "name": "card",
    "base": {
        "display": "block"
    },
    "variants": {
        "variant": {
            "elevated": {
                "boxShadow": "0 2px 4px rgba(0,0,0,0.1)"
            },
            "flat": {
                "boxShadow": "none"
            }
        },
        "size": {
            "sm": {
                "padding": "0.5rem"
            },
            "md": {
                "padding": "1rem"
            },
            "lg": {
                "padding": "1.5rem"
            }
        }
    }
};

export const card = createRecipe(cardRecipe);
`);
	});

	it("should generate recipe with defaultVariants", () => {
		const recipe: Recipe = {
			type: "recipe",
			name: "chip",
			base: { borderRadius: "4px" },
			variants: {
				variant: {
					filled: { background: "primary" },
					outline: { border: "1px solid" },
				},
				size: {
					sm: { fontSize: "12px" },
					md: { fontSize: "14px" },
				},
			},
			defaultVariants: {
				variant: "filled",
				size: "sm",
			},
		};

		const result = consumeRecipe(recipe, options);

		expect(result).toEqual(`const chipRecipe: Recipe = {
    "type": "recipe",
    "name": "chip",
    "base": {
        "borderRadius": "4px"
    },
    "variants": {
        "variant": {
            "filled": {
                "background": "primary"
            },
            "outline": {
                "border": "1px solid"
            }
        },
        "size": {
            "sm": {
                "fontSize": "12px"
            },
            "md": {
                "fontSize": "14px"
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

	it("should generate recipe with compoundVariants", () => {
		const recipe: Recipe = {
			type: "recipe",
			name: "badge",
			base: { display: "inline-block" },
			variants: {
				variant: {
					solid: { background: "blue" },
					outline: { border: "1px solid blue" },
				},
				size: {
					sm: { padding: "2px 4px" },
					lg: { padding: "4px 8px" },
				},
			},
			compoundVariants: [
				{
					match: { variant: "solid", size: "sm" },
					css: { fontSize: "10px" },
				},
				{
					match: { variant: "outline", size: "lg" },
					css: { fontSize: "16px", fontWeight: "bold" },
				},
			],
		};

		const result = consumeRecipe(recipe, options);

		expect(result).toEqual(`const badgeRecipe: Recipe = {
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
                "border": "1px solid blue"
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
                "fontSize": "10px"
            }
        },
        {
            "match": {
                "variant": "outline",
                "size": "lg"
            },
            "css": {
                "fontSize": "16px",
                "fontWeight": "bold"
            }
        }
    ]
};

export const badge = createRecipe(badgeRecipe);
`);
	});

	it("should generate recipe with both defaultVariants and compoundVariants", () => {
		const recipe: Recipe = {
			type: "recipe",
			name: "input",
			base: { borderWidth: "1px", borderStyle: "solid" },
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
			defaultVariants: {
				variant: "outline",
				size: "sm",
			},
			compoundVariants: [
				{
					match: { variant: "filled", size: "lg" },
					css: { padding: "0 16px", fontSize: "18px" },
				},
			],
		};

		const result = consumeRecipe(recipe, options);

		expect(result).toEqual(`const inputRecipe: Recipe = {
    "type": "recipe",
    "name": "input",
    "base": {
        "borderWidth": "1px",
        "borderStyle": "solid"
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
                "padding": "0 16px",
                "fontSize": "18px"
            }
        }
    ]
};

export const input = createRecipe(inputRecipe);
`);
	});

	it("should generate recipe with empty defaults", () => {
		const recipe: Recipe = {
			type: "recipe",
			name: "minimal",
			base: {},
			variants: {
				size: {
					sm: { fontSize: "12px" },
					lg: { fontSize: "16px" },
				},
			},
		};

		const result = consumeRecipe(recipe, options);

		expect(result).toEqual(`const minimalRecipe: Recipe = {
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

	it("should generate recipe with empty variants", () => {
		const recipe: Recipe = {
			type: "recipe",
			name: "simple",
			base: { padding: "1rem", margin: "0" },
			variants: {},
		};

		const result = consumeRecipe(recipe, options);

		expect(result).toEqual(`const simpleRecipe: Recipe = {
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

	it("should handle recipe names with PascalCase", () => {
		const recipe: Recipe = {
			type: "recipe",
			name: "PrimaryButton",
			base: { cursor: "pointer" },
			variants: {},
		};

		const result = consumeRecipe(recipe, options);

		expect(result).toEqual(`const PrimaryButtonRecipe: Recipe = {
    "type": "recipe",
    "name": "PrimaryButton",
    "base": {
        "cursor": "pointer"
    },
    "variants": {}
};

export const PrimaryButton = createRecipe(PrimaryButtonRecipe);
`);
	});

	it("should handle recipe names with camelCase", () => {
		const recipe: Recipe = {
			type: "recipe",
			name: "primaryButton",
			base: { cursor: "pointer" },
			variants: {},
		};

		const result = consumeRecipe(recipe, options);

		expect(result).toEqual(`const primaryButtonRecipe: Recipe = {
    "type": "recipe",
    "name": "primaryButton",
    "base": {
        "cursor": "pointer"
    },
    "variants": {}
};

export const primaryButton = createRecipe(primaryButtonRecipe);
`);
	});

	it("should handle recipe names with kebab-case", () => {
		const recipe: Recipe = {
			type: "recipe",
			name: "primary-button",
			base: { cursor: "pointer" },
			variants: {},
		};

		const result = consumeRecipe(recipe, options);

		expect(result).toEqual(`const primaryButtonRecipe: Recipe = {
    "type": "recipe",
    "name": "primary-button",
    "base": {
        "cursor": "pointer"
    },
    "variants": {}
};

export const primaryButton = createRecipe(primaryButtonRecipe);
`);
	});

	it("should handle recipe with complex nested variant declarations", () => {
		const recipe: Recipe = {
			type: "recipe",
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
					success: {
						background: "#e8f5e9",
						color: "#388e3c",
						borderColor: "#388e3c",
					},
				},
			},
		};

		const result = consumeRecipe(recipe, options);

		expect(result).toEqual(`const alertRecipe: Recipe = {
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
            },
            "success": {
                "background": "#e8f5e9",
                "color": "#388e3c",
                "borderColor": "#388e3c"
            }
        }
    }
};

export const alert = createRecipe(alertRecipe);
`);
	});

	it("should correctly format recipe constant name", () => {
		const recipe: Recipe = {
			type: "recipe",
			name: "myComponent",
			base: {},
			variants: {},
		};

		const result = consumeRecipe(recipe, options);

		expect(result).toContain("const myComponentRecipe: Recipe =");
		expect(result).toContain(
			"export const myComponent = createRecipe(myComponentRecipe);",
		);
	});

	it("should preserve all recipe properties in JSON stringification", () => {
		const recipe: Recipe = {
			type: "recipe",
			name: "complete",
			base: { display: "block" },
			variants: {
				size: {
					sm: { width: "100px" },
					lg: { width: "200px" },
				},
			},
			defaultVariants: { size: "sm" },
			compoundVariants: [
				{
					match: { size: "lg" },
					css: { fontWeight: "bold" },
				},
			],
		};

		const result = consumeRecipe(recipe, options);

		expect(result).toContain('"type": "recipe"');
		expect(result).toContain('"name": "complete"');
		expect(result).toContain('"base"');
		expect(result).toContain('"variants"');
		expect(result).toContain('"defaultVariants"');
		expect(result).toContain('"compoundVariants"');
	});

	it("should use 4-space indentation in JSON output", () => {
		const recipe: Recipe = {
			type: "recipe",
			name: "indented",
			base: { padding: "1rem" },
			variants: {
				size: {
					sm: { fontSize: "12px" },
				},
			},
		};

		const result = consumeRecipe(recipe, options);

		// Check for 4-space indentation
		expect(result).toContain('    "type": "recipe"');
		expect(result).toContain('    "name": "indented"');
		expect(result).toContain('        "padding": "1rem"');
	});

	it("should not call the consume function parameter", () => {
		const recipe: Recipe = {
			type: "recipe",
			name: "test",
			base: {},
			variants: {},
		};

		consumeRecipe(recipe, options);

		expect(mockConsume).not.toHaveBeenCalled();
	});

	it("should work with different options", () => {
		const recipe: Recipe = {
			type: "recipe",
			name: "button",
			base: { cursor: "pointer" },
			variants: {},
		};

		const customOptions: StyleframeOptions = {};
		const result = consumeRecipe(recipe, customOptions);

		expect(result).toEqual(`const buttonRecipe: Recipe = {
    "type": "recipe",
    "name": "button",
    "base": {
        "cursor": "pointer"
    },
    "variants": {}
};

export const button = createRecipe(buttonRecipe);
`);
	});

	it("should handle recipe with single variant group and single variant", () => {
		const recipe: Recipe = {
			type: "recipe",
			name: "toggle",
			base: { display: "inline-block" },
			variants: {
				state: {
					on: { background: "green" },
				},
			},
		};

		const result = consumeRecipe(recipe, options);

		expect(result).toEqual(`const toggleRecipe: Recipe = {
    "type": "recipe",
    "name": "toggle",
    "base": {
        "display": "inline-block"
    },
    "variants": {
        "state": {
            "on": {
                "background": "green"
            }
        }
    }
};

export const toggle = createRecipe(toggleRecipe);
`);
	});

	it("should handle recipe with empty variant declarations", () => {
		const recipe: Recipe = {
			type: "recipe",
			name: "placeholder",
			base: { opacity: "0.5" },
			variants: {
				state: {
					empty: {},
					filled: { opacity: "1" },
				},
			},
		};

		const result = consumeRecipe(recipe, options);

		expect(result).toEqual(`const placeholderRecipe: Recipe = {
    "type": "recipe",
    "name": "placeholder",
    "base": {
        "opacity": "0.5"
    },
    "variants": {
        "state": {
            "empty": {},
            "filled": {
                "opacity": "1"
            }
        }
    }
};

export const placeholder = createRecipe(placeholderRecipe);
`);
	});

	it("should handle recipe with multiple compound variants", () => {
		const recipe: Recipe = {
			type: "recipe",
			name: "matrix",
			base: {},
			variants: {
				x: {
					left: { justifyContent: "flex-start" },
					right: { justifyContent: "flex-end" },
				},
				y: {
					top: { alignItems: "flex-start" },
					bottom: { alignItems: "flex-end" },
				},
			},
			compoundVariants: [
				{
					match: { x: "left", y: "top" },
					css: { padding: "10px 0 0 10px" },
				},
				{
					match: { x: "right", y: "bottom" },
					css: { padding: "0 10px 10px 0" },
				},
				{
					match: { x: "left", y: "bottom" },
					css: { padding: "0 0 10px 10px" },
				},
			],
		};

		const result = consumeRecipe(recipe, options);

		expect(result).toEqual(`const matrixRecipe: Recipe = {
    "type": "recipe",
    "name": "matrix",
    "base": {},
    "variants": {
        "x": {
            "left": {
                "justifyContent": "flex-start"
            },
            "right": {
                "justifyContent": "flex-end"
            }
        },
        "y": {
            "top": {
                "alignItems": "flex-start"
            },
            "bottom": {
                "alignItems": "flex-end"
            }
        }
    },
    "compoundVariants": [
        {
            "match": {
                "x": "left",
                "y": "top"
            },
            "css": {
                "padding": "10px 0 0 10px"
            }
        },
        {
            "match": {
                "x": "right",
                "y": "bottom"
            },
            "css": {
                "padding": "0 10px 10px 0"
            }
        },
        {
            "match": {
                "x": "left",
                "y": "bottom"
            },
            "css": {
                "padding": "0 0 10px 10px"
            }
        }
    ]
};

export const matrix = createRecipe(matrixRecipe);
`);
	});

	it("should handle recipe with CSS custom properties", () => {
		const recipe: Recipe = {
			type: "recipe",
			name: "themed",
			base: {
				"--primary-color": "blue",
				"--secondary-color": "gray",
			},
			variants: {
				theme: {
					dark: {
						"--primary-color": "lightblue",
						"--secondary-color": "darkgray",
					},
					light: {
						"--primary-color": "darkblue",
						"--secondary-color": "lightgray",
					},
				},
			},
		};

		const result = consumeRecipe(recipe, options);

		expect(result).toEqual(`const themedRecipe: Recipe = {
    "type": "recipe",
    "name": "themed",
    "base": {
        "--primary-color": "blue",
        "--secondary-color": "gray"
    },
    "variants": {
        "theme": {
            "dark": {
                "--primary-color": "lightblue",
                "--secondary-color": "darkgray"
            },
            "light": {
                "--primary-color": "darkblue",
                "--secondary-color": "lightgray"
            }
        }
    }
};

export const themed = createRecipe(themedRecipe);
`);
	});

	it("should generate correct TypeScript type annotation", () => {
		const recipe: Recipe = {
			type: "recipe",
			name: "typeCheck",
			base: {},
			variants: {},
		};

		const result = consumeRecipe(recipe, options);

		expect(result).toContain("const typeCheckRecipe: Recipe = {");
	});

	it("should generate correct export statement", () => {
		const recipe: Recipe = {
			type: "recipe",
			name: "exportTest",
			base: {},
			variants: {},
		};

		const result = consumeRecipe(recipe, options);

		expect(result).toContain(
			"export const exportTest = createRecipe(exportTestRecipe);",
		);
	});
});

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/**
 * Guards the seam between two hand-maintained parallel recipe registrations:
 *
 *   - Storybook shim:    apps/storybook/stories/components/<name>.styleframe.ts
 *   - Playground recipe: tooling/plugin/playground/recipes/<name>.styleframe.ts
 *
 * The playground renders Storybook's own Vue components (via the
 * `@storybook-components` alias). Those components import recipe functions
 * (e.g. `calloutTitle`) from `virtual:styleframe`, so the playground's recipe
 * file must register the *same set* of recipes as the Storybook shim — or the
 * playground build fails late, at the Build Packages stage, with a
 * `MISSING_EXPORT` (this is what SF-17 hit for the callout title/description
 * sub-recipes).
 *
 * Two hand-maintained lists drift. This test fails fast, at unit-test speed,
 * naming the missing recipe and both files, so a new sub-recipe added to one
 * side but not the other is caught before it ever reaches the build.
 */

const testDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(testDir, "../../..");

const STORYBOOK_SHIM_DIR = join(repoRoot, "apps/storybook/stories/components");
const PLAYGROUND_RECIPE_DIR = join(
	repoRoot,
	"tooling/plugin/playground/recipes",
);

const SHIM_SUFFIX = ".styleframe.ts";

/**
 * Extract the set of recipes a `*.styleframe.ts` file *registers*, keyed by the
 * `use<Name>Recipe` hook that is actually invoked. The trailing `(` requirement
 * excludes the import statement (which lists the same identifiers without a
 * call) and matches only real registration calls like
 * `useCalloutTitleRecipe(s)`. Each registration in these files is paired 1:1
 * with the named export a consuming Vue component imports, so this set is
 * exactly the surface a `MISSING_EXPORT` would complain about.
 */
function extractRegisteredRecipes(source: string): Set<string> {
	const recipes = new Set<string>();
	const pattern = /\b(use[A-Z][A-Za-z0-9]*Recipe)\s*\(/g;
	for (const match of source.matchAll(pattern)) {
		recipes.add(match[1]);
	}
	return recipes;
}

function componentName(fileName: string): string {
	return fileName.slice(0, -SHIM_SUFFIX.length);
}

function playgroundRecipeFiles(): string[] {
	if (!existsSync(PLAYGROUND_RECIPE_DIR)) return [];
	return readdirSync(PLAYGROUND_RECIPE_DIR)
		.filter((file) => file.endsWith(SHIM_SUFFIX))
		.sort();
}

function rel(path: string): string {
	return relative(repoRoot, path);
}

const recipeFiles = playgroundRecipeFiles();

describe("playground ↔ storybook recipe registration parity", () => {
	it("has playground recipe files to check", () => {
		// A sanity guard: if the directory layout moves, the drift check below
		// would silently pass with zero cases. Fail loudly instead.
		expect(recipeFiles.length).toBeGreaterThan(0);
	});

	it.each(recipeFiles)(
		"%s registers the same recipes in both the playground and the Storybook shim",
		(fileName) => {
			const name = componentName(fileName);
			const playgroundPath = join(PLAYGROUND_RECIPE_DIR, fileName);
			const shimPath = join(STORYBOOK_SHIM_DIR, fileName);

			expect(
				existsSync(shimPath),
				`Playground registers recipes for "${name}" but there is no matching ` +
					`Storybook shim.\n` +
					`  Playground recipe: ${rel(playgroundPath)}\n` +
					`  Expected shim:     ${rel(shimPath)}\n` +
					`The playground renders Storybook's "${name}" component, so a shim ` +
					`must exist and register the same recipes.`,
			).toBe(true);

			const playgroundRecipes = extractRegisteredRecipes(
				readFileSync(playgroundPath, "utf8"),
			);
			const shimRecipes = extractRegisteredRecipes(
				readFileSync(shimPath, "utf8"),
			);

			const missingFromPlayground = [...shimRecipes]
				.filter((recipe) => !playgroundRecipes.has(recipe))
				.sort();
			const missingFromShim = [...playgroundRecipes]
				.filter((recipe) => !shimRecipes.has(recipe))
				.sort();

			if (missingFromPlayground.length > 0 || missingFromShim.length > 0) {
				const lines = [
					`Recipe registration drift for "${name}".`,
					`  Storybook shim:    ${rel(shimPath)}`,
					`  Playground recipe: ${rel(playgroundPath)}`,
				];
				if (missingFromPlayground.length > 0) {
					lines.push(
						`  Registered in the Storybook shim but missing from the ` +
							`playground recipe: ${missingFromPlayground.join(", ")}`,
					);
				}
				if (missingFromShim.length > 0) {
					lines.push(
						`  Registered in the playground recipe but missing from the ` +
							`Storybook shim: ${missingFromShim.join(", ")}`,
					);
				}
				lines.push(
					`Register the missing recipe(s) in both files so they stay in ` +
						`sync — otherwise the playground build fails with MISSING_EXPORT ` +
						`at the Build Packages stage.`,
				);
				throw new Error(lines.join("\n"));
			}

			// Also assert equality directly so the matcher output is meaningful
			// when the message above is not the failure that surfaces first.
			expect([...playgroundRecipes].sort()).toEqual([...shimRecipes].sort());
		},
	);
});

import type { Extractor } from "./types";
import { extractUtilityClasses } from "./parser";

// Module-level compiled regex patterns for performance
// Patterns with 'g' flag require lastIndex reset before .exec() loops

/** Matches className={...} in JSX */
const CLASSNAME_EXPR_PATTERN = /\bclassName\s*=\s*\{/g;

/** Matches class={...} in Svelte */
const CLASS_EXPR_PATTERN = /\bclass\s*=\s*\{/g;

/** Matches class="..." or class='...' in HTML */
const CLASS_ATTR_PATTERN = /\bclass\s*=\s*["']([^"']+)["']/gi;

/** Matches className="..." or className='...' in JSX */
const CLASSNAME_STRING_PATTERN = /\bclassName\s*=\s*["']([^"']+)["']/gi;

/** Matches Svelte class:_directive syntax */
const SVELTE_CLASS_DIRECTIVE_PATTERN =
	/\bclass:(_[a-zA-Z][a-zA-Z0-9-:[\]._]*)/g;

/** Matches single-quoted strings */
const SINGLE_QUOTE_PATTERN = /'([^'\\]*(?:\\.[^'\\]*)*)'/g;

/** Matches double-quoted strings */
const DOUBLE_QUOTE_PATTERN = /"([^"\\]*(?:\\.[^"\\]*)*)"/g;

/** Matches template literal strings (without interpolation handling) */
const TEMPLATE_LITERAL_PATTERN = /`([^`\\]*(?:\\.[^`\\]*)*)`/g;

/**
 * Extract the content of a braced expression, handling nested braces.
 * Returns the content inside the outermost braces, or null if unbalanced.
 *
 * @param str The string starting after the opening brace
 * @returns The content inside balanced braces, or null if unbalanced
 */
function extractBracedContent(str: string): string | null {
	let depth = 1;
	let i = 0;

	while (i < str.length && depth > 0) {
		const char = str[i];
		if (char === "{") {
			depth++;
		} else if (char === "}") {
			depth--;
		}
		i++;
	}

	if (depth !== 0) {
		return null;
	}

	// Return content excluding the final closing brace
	return str.slice(0, i - 1);
}

/**
 * Find all className={...} expressions in content and extract their inner content,
 * properly handling nested braces.
 */
function extractClassNameExpressions(content: string): string[] {
	const results: string[] = [];
	CLASSNAME_EXPR_PATTERN.lastIndex = 0;
	let match: RegExpExecArray | null;

	while ((match = CLASSNAME_EXPR_PATTERN.exec(content)) !== null) {
		const startIndex = match.index + match[0].length;
		const remaining = content.slice(startIndex);
		const bracedContent = extractBracedContent(remaining);

		if (bracedContent !== null) {
			results.push(bracedContent);
		}
	}

	return results;
}

/**
 * Find all class={...} expressions in content (for Svelte) and extract their inner content,
 * properly handling nested braces.
 */
function extractClassExpressions(content: string): string[] {
	const results: string[] = [];
	CLASS_EXPR_PATTERN.lastIndex = 0;
	let match: RegExpExecArray | null;

	while ((match = CLASS_EXPR_PATTERN.exec(content)) !== null) {
		const startIndex = match.index + match[0].length;
		const remaining = content.slice(startIndex);
		const bracedContent = extractBracedContent(remaining);

		if (bracedContent !== null) {
			results.push(bracedContent);
		}
	}

	return results;
}

/**
 * Extract utility classes from HTML-like content.
 * Handles class="..." attributes.
 */
function extractFromHTML(content: string): string[] {
	const classes: string[] = [];

	// Match class="..." attributes (handles both single and double quotes)
	CLASS_ATTR_PATTERN.lastIndex = 0;
	let match: RegExpExecArray | null;

	while ((match = CLASS_ATTR_PATTERN.exec(content)) !== null) {
		if (match[1]) {
			classes.push(...extractUtilityClasses(match[1]));
		}
	}

	return classes;
}

/**
 * Extract utility classes from JSX/TSX content.
 * Handles className="..." and className={...} patterns.
 */
function extractFromJSX(content: string): string[] {
	const classes: string[] = [];

	// Match className="..." (string literals)
	CLASSNAME_STRING_PATTERN.lastIndex = 0;
	let match: RegExpExecArray | null;

	while ((match = CLASSNAME_STRING_PATTERN.exec(content)) !== null) {
		if (match[1]) {
			classes.push(...extractUtilityClasses(match[1]));
		}
	}

	// Match className={...} (expressions) - extract string literals inside
	// Uses bracket-matching to handle nested braces like className={clsx({ '_margin:sm': true })}
	const expressions = extractClassNameExpressions(content);
	for (const expr of expressions) {
		classes.push(...extractFromStringLiterals(expr));
	}

	return [...new Set(classes)];
}

/**
 * Extract utility classes from Vue SFC content.
 * Handles class="...", :class="...", and :class="{...}" patterns.
 */
function extractFromVue(content: string): string[] {
	const classes: string[] = [];

	// Extract from template section
	const templateMatch = content.match(/<template[^>]*>([\s\S]*?)<\/template>/i);
	if (templateMatch?.[1]) {
		classes.push(...extractFromHTML(templateMatch[1]));

		// Also extract from string literals in template (catches :class bindings with object syntax)
		classes.push(...extractFromStringLiterals(templateMatch[1]));
	}

	// Extract from script section
	const scriptMatch = content.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
	if (scriptMatch?.[1]) {
		classes.push(...extractFromStringLiterals(scriptMatch[1]));
	}

	return [...new Set(classes)];
}

/**
 * Extract utility classes from Svelte content.
 * Handles class="...", class:directive={condition}, and class={...} patterns.
 */
function extractFromSvelte(content: string): string[] {
	const classes: string[] = [];

	// Extract from class attributes
	classes.push(...extractFromHTML(content));

	// Handle class={...} expressions with proper bracket matching
	const expressions = extractClassExpressions(content);
	for (const expr of expressions) {
		classes.push(...extractFromStringLiterals(expr));
	}

	// Handle Svelte class:directive syntax (e.g., class:_margin-sm={condition})
	// Matches class: followed by a utility class name (starting with _)
	SVELTE_CLASS_DIRECTIVE_PATTERN.lastIndex = 0;
	let match: RegExpExecArray | null;
	while ((match = SVELTE_CLASS_DIRECTIVE_PATTERN.exec(content)) !== null) {
		if (match[1]) {
			classes.push(match[1]);
		}
	}

	// Extract from script section
	const scriptMatch = content.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
	if (scriptMatch?.[1]) {
		classes.push(...extractFromStringLiterals(scriptMatch[1]));
	}

	return [...new Set(classes)];
}

/**
 * Extract utility classes from Astro content.
 * Handles both HTML-like and JSX-like patterns.
 */
function extractFromAstro(content: string): string[] {
	const classes: string[] = [];

	// Astro uses both class and className
	classes.push(...extractFromHTML(content));
	classes.push(...extractFromJSX(content));

	// Extract from frontmatter and script
	const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
	if (frontmatterMatch?.[1]) {
		classes.push(...extractFromStringLiterals(frontmatterMatch[1]));
	}

	return [...new Set(classes)];
}

/**
 * Extract utility classes from string literals in JavaScript/TypeScript code.
 * Handles single quotes, double quotes, and template literals.
 *
 * Note: Template literals with interpolations (e.g., `_margin:${size}`) will only
 * extract the static portions. Dynamic class names cannot be statically analyzed.
 * For full coverage, use explicit string arrays or safelist patterns.
 */
function extractFromStringLiterals(content: string): string[] {
	const classes: string[] = [];
	let match: RegExpExecArray | null;

	// Match single-quoted strings
	SINGLE_QUOTE_PATTERN.lastIndex = 0;
	while ((match = SINGLE_QUOTE_PATTERN.exec(content)) !== null) {
		if (match[1]) {
			classes.push(...extractUtilityClasses(match[1]));
		}
	}

	// Match double-quoted strings
	DOUBLE_QUOTE_PATTERN.lastIndex = 0;
	while ((match = DOUBLE_QUOTE_PATTERN.exec(content)) !== null) {
		if (match[1]) {
			classes.push(...extractUtilityClasses(match[1]));
		}
	}

	// Match template literals without interpolations.
	// Literals like `_margin:${size}` will match but ${...} appears as literal text,
	// so only static class names before/after interpolations are extracted.
	TEMPLATE_LITERAL_PATTERN.lastIndex = 0;
	while ((match = TEMPLATE_LITERAL_PATTERN.exec(content)) !== null) {
		if (match[1]) {
			classes.push(...extractUtilityClasses(match[1]));
		}
	}

	return classes;
}

/**
 * Extract utility classes from MDX content.
 * Handles both Markdown and JSX patterns.
 */
function extractFromMDX(content: string): string[] {
	const classes: string[] = [];

	classes.push(...extractFromHTML(content));
	classes.push(...extractFromJSX(content));

	return [...new Set(classes)];
}

/**
 * Default extractors mapped by file extension.
 */
const defaultExtractors: Record<string, (content: string) => string[]> = {
	html: extractFromHTML,
	htm: extractFromHTML,
	vue: extractFromVue,
	svelte: extractFromSvelte,
	jsx: extractFromJSX,
	tsx: extractFromJSX,
	js: extractFromStringLiterals,
	ts: extractFromStringLiterals,
	astro: extractFromAstro,
	mdx: extractFromMDX,
	php: extractFromHTML,
	erb: extractFromHTML,
	twig: extractFromHTML,
	"blade.php": extractFromHTML,
};

/**
 * Get the file extension from a path.
 */
function getExtension(filePath: string): string {
	// Handle compound extensions like .blade.php
	if (filePath.endsWith(".blade.php")) {
		return "blade.php";
	}
	const parts = filePath.split(".");
	return parts[parts.length - 1]?.toLowerCase() ?? "";
}

/**
 * Extract utility classes from file content.
 *
 * @param content The file content
 * @param filePath The file path (used to determine extractor)
 * @param customExtractors Optional custom extractors to use in addition to defaults
 * @returns Array of unique utility class names found
 */
export function extractClasses(
	content: string,
	filePath: string,
	customExtractors?: Extractor[],
): string[] {
	const classes: string[] = [];
	const extension = getExtension(filePath);

	// Run custom extractors first
	if (customExtractors) {
		for (const extractor of customExtractors) {
			classes.push(...extractor(content, filePath));
		}
	}

	// Run default extractor for file type
	const defaultExtractor = defaultExtractors[extension];
	if (defaultExtractor) {
		classes.push(...defaultExtractor(content));
	} else {
		// Fallback: extract from all string literals
		classes.push(...extractFromStringLiterals(content));
	}

	return [...new Set(classes)];
}

export {
	extractFromHTML,
	extractFromJSX,
	extractFromVue,
	extractFromSvelte,
	extractFromAstro,
	extractFromMDX,
	extractFromStringLiterals,
};

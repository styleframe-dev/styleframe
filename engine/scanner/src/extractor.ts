import type { Extractor } from "./types";
import { extractUtilityClasses } from "./parser";

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
	const pattern = /\bclassName\s*=\s*\{/g;
	let match: RegExpExecArray | null;

	while ((match = pattern.exec(content)) !== null) {
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
	const pattern = /\bclass\s*=\s*\{/g;
	let match: RegExpExecArray | null;

	while ((match = pattern.exec(content)) !== null) {
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
	const classAttrPattern = /\bclass\s*=\s*["']([^"']+)["']/gi;
	let match: RegExpExecArray | null;

	while ((match = classAttrPattern.exec(content)) !== null) {
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
	const classNameStringPattern = /\bclassName\s*=\s*["']([^"']+)["']/gi;
	let match: RegExpExecArray | null;

	while ((match = classNameStringPattern.exec(content)) !== null) {
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
 * Handles class="...", class:directive, and class={...} patterns.
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
 */
function extractFromStringLiterals(content: string): string[] {
	const classes: string[] = [];

	// Match single-quoted strings
	const singleQuotePattern = /'([^'\\]*(?:\\.[^'\\]*)*)'/g;
	let match: RegExpExecArray | null;

	while ((match = singleQuotePattern.exec(content)) !== null) {
		if (match[1]) {
			classes.push(...extractUtilityClasses(match[1]));
		}
	}

	// Match double-quoted strings
	const doubleQuotePattern = /"([^"\\]*(?:\\.[^"\\]*)*)"/g;
	while ((match = doubleQuotePattern.exec(content)) !== null) {
		if (match[1]) {
			classes.push(...extractUtilityClasses(match[1]));
		}
	}

	// Match template literals (simplified - doesn't handle nested expressions)
	const templatePattern = /`([^`\\]*(?:\\.[^`\\]*)*)`/g;
	while ((match = templatePattern.exec(content)) !== null) {
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

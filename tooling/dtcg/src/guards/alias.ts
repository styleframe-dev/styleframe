import type { DTCGAlias } from "../types/alias";

const ALIAS_PATTERN = /^\{[^{}]+\}$/;

/**
 * True iff `value` is a DTCG alias string of the form `{path}`.
 *
 * Empty bodies (`{}`) and nested braces (`{a.{b}}`) are rejected — both are
 * invalid per the spec.
 */
export function isAlias(value: unknown): value is DTCGAlias {
	return typeof value === "string" && ALIAS_PATTERN.test(value);
}

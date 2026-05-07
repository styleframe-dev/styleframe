/**
 * Validate vendor extension namespaces. Per Format Module §8 they MUST
 * follow reverse-DNS naming, e.g. `com.example.tool` or `dev.styleframe`.
 */

const RDNS_PATTERN = /^[a-z0-9]+(\.[a-z0-9-]+)+$/i;

export function isValidNamespace(namespace: string): boolean {
	return RDNS_PATTERN.test(namespace);
}

export type RangeInput<T> = [min: T, max: T] | { min: T; max: T };

export function normalizeRange<T>(range: RangeInput<T>): [T, T] {
	return Array.isArray(range) ? range : [range.min, range.max];
}

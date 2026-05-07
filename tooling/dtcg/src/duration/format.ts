import type { DTCGDuration } from "../types/duration";

export function format(duration: DTCGDuration): string {
	return `${duration.value}${duration.unit}`;
}

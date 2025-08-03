import type { Root } from "../types";

export function createRoot(): Root {
	return {
		type: "root",
		children: [],
	};
}

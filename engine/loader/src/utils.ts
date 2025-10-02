import { stat } from "node:fs/promises";

export async function directoryExists(path: string) {
	try {
		const stats = await stat(path);
		return stats.isDirectory();
	} catch {
		return false;
	}
}

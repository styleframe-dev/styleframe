import {
	getLicenseKeyFromEnv,
	validateInstanceLicense,
} from "@styleframe/license";
import { transpile } from "@styleframe/transpiler";
import { consola } from "consola";
import type { PluginGlobalState } from "../state";
import type { Options } from "../types";

/**
 * Generate global CSS from the global instance.
 */
export async function generateGlobalCSS(
	state: PluginGlobalState,
	isBuild: boolean,
	options: Options,
): Promise<{ code: string }> {
	if (!state.globalInstance) {
		return { code: "/* Styleframe not initialized */" };
	}

	await validateInstanceLicense(state.globalInstance, {
		licenseKey: getLicenseKeyFromEnv() || "",
		environment: process.env.NODE_ENV || "development",
		isBuild,
	});

	const result = await transpile(state.globalInstance, { type: "css" });
	const css = result.files.map((f) => f.content).join("\n");

	if (!options.silent) {
		consola.success(`[styleframe] Built global CSS successfully.`);
	}

	return { code: css };
}

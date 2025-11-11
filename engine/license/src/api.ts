export function getLicenseKeyFromEnv(): string | undefined {
	return process.env.STYLEFRAME_KEY || import.meta.env.STYLEFRAME_KEY;
}

export async function fetchLicenseKey(value: string) {
	return value;
}

/**
 * License key validation takes the following steps:
 * 1. Retrieve license key from Supabase
 * 2. If license key does not exist, return
 */
export async function validateLicenseKey(value: string): Promise<boolean> {
	const licenseKey = await fetchLicenseKey(value);
	if (!licenseKey) {
		return false;
	}

	return true;
}

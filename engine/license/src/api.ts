import { SUPABASE_URL } from "./constants";
import type {
	ActivateLicenseRequest,
	ActivateLicenseResponse,
	ValidateLicenseRequest,
	ValidateLicenseResponse,
} from "./types";

export function getLicenseKeyFromEnv(): string | undefined {
	return process.env.STYLEFRAME_KEY || import.meta.env.STYLEFRAME_KEY;
}

/**
 * Activate a license key
 */
export async function activateLicenseKey(
	request: ActivateLicenseRequest,
): Promise<ActivateLicenseResponse> {
	const response = await fetch(
		`${SUPABASE_URL}/functions/v1/activate-license`,
		{
			method: "POST",
			body: JSON.stringify(request),
		},
	);

	return await response.json();
}

/**
 * Validate a license key
 */
export async function validateLicenseKey(
	request: ValidateLicenseRequest,
): Promise<ValidateLicenseResponse> {
	const response = await fetch(
		`${SUPABASE_URL}/functions/v1/validate-license`,
		{
			method: "POST",
			body: JSON.stringify(request),
		},
	);

	return await response.json();
}

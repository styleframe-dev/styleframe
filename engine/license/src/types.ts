// ============================================================================
// Common Types
// ============================================================================

export interface ErrorResponse {
	error: string;
	details?: string;
}

export type LicenseStatus = "granted" | "revoked" | "expired" | "disabled";

// ============================================================================
// Polar API Common Types
// ============================================================================

export interface PolarCustomer {
	email: string;
	name: string;
}

export interface PolarLicenseActivation {
	[key: string]: unknown;
}

// ============================================================================
// Activation Types
// ============================================================================

export interface ActivateLicenseRequest {
	key: string;
	label?: string;
	meta?: Record<string, unknown>;
}

export interface PolarLicenseKey {
	id: string;
	key: string;
	display_key: string;
	status: LicenseStatus;
	expires_at: string | null;
	customer_id: string;
	customer: PolarCustomer;
	activation: PolarLicenseActivation;
}

export interface PolarActivateResponse {
	license_key: PolarLicenseKey;
}

export interface LicenseData {
	id: string;
	key: string;
	display_key: string;
	status: LicenseStatus;
	expires_at: string | null;
	activation: PolarLicenseActivation;
}

export interface ActivateLicenseSuccessResponse {
	success: true;
	license: LicenseData;
}

export type ActivateLicenseResponse =
	| ActivateLicenseSuccessResponse
	| ErrorResponse;

// ============================================================================
// Validation Types
// ============================================================================

export interface ValidateLicenseRequest {
	key: string;
}

export interface PolarValidateRequest {
	key: string;
	organization_id: string;
}

export interface PolarValidateResponse {
	id: string;
	key: string;
	status: LicenseStatus;
	display_key?: string;
	customer_id?: string;
	organization_id?: string;
	expires_at?: string | null;
	[key: string]: unknown;
}

export interface ValidateLicenseSuccessResponse {
	valid: boolean;
}

export type ValidateLicenseResponse =
	| ValidateLicenseSuccessResponse
	| ErrorResponse;

// ============================================================================
// Database Types
// ============================================================================

export interface Customer {
	polar_customer_id: string;
	email: string;
	name: string;
}

export interface License {
	polar_license_id: string;
	license_key: string;
	polar_customer_id: string;
	last_synced_at: string;
}

export interface LicenseUpdate {
	last_synced_at: string;
}

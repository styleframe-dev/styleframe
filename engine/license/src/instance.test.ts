/* biome-ignore-all lint/suspicious/noExplicitAny: license property is not supposed to be accessible */

import { describe, expect, it } from "vitest";
import { LICENSE_PROPERTY_NAME } from "./constants";
import { markLicenseRequired } from "./instance";

const styleframe = () => ({});

describe("markLicenseRequired", () => {
	describe("basic functionality", () => {
		it("should mark a styleframe instance as license required", () => {
			const s = styleframe();
			markLicenseRequired(s);

			expect((s as any)[LICENSE_PROPERTY_NAME]).toBe(true);
		});

		it("should not appear in Object.keys (symbols are never enumerable via Object.keys)", () => {
			const s = styleframe();
			markLicenseRequired(s);

			const keys = Object.keys(s);
			expect(keys).not.toContain(LICENSE_PROPERTY_NAME);
		});

		it("should be preserved when spreading", () => {
			const s = styleframe();
			markLicenseRequired(s);

			const spread = { ...s };
			expect((spread as any)[LICENSE_PROPERTY_NAME]).toBe(true);
		});

		it("should not appear in for...in loop (symbols never appear in for...in)", () => {
			const s = styleframe();
			markLicenseRequired(s);

			const keys: string[] = [];
			for (const key in s) {
				keys.push(key);
			}
			expect(keys).not.toContain(LICENSE_PROPERTY_NAME);
		});

		it("should appear in Object.getOwnPropertySymbols", () => {
			const s = styleframe();
			markLicenseRequired(s);

			const symbols = Object.getOwnPropertySymbols(s);
			expect(symbols).toContain(LICENSE_PROPERTY_NAME);
		});

		it("should be accessible via direct property access", () => {
			const s = styleframe();
			markLicenseRequired(s);

			expect((s as any)[LICENSE_PROPERTY_NAME]).toBe(true);
		});
	});

	describe("immutability", () => {
		it("should prevent overwriting the value", () => {
			const s = styleframe();
			markLicenseRequired(s);

			// Attempt to overwrite - this throws in strict mode
			try {
				(s as any)[LICENSE_PROPERTY_NAME] = false;
			} catch (error) {
				// Expected to throw in strict mode
			}

			// Value should remain true
			expect((s as any)[LICENSE_PROPERTY_NAME]).toBe(true);
		});

		it("should prevent deletion", () => {
			const s = styleframe();
			markLicenseRequired(s);

			// Attempt to delete - this throws in strict mode
			try {
				delete (s as any)[LICENSE_PROPERTY_NAME];
			} catch (error) {
				// Expected to throw in strict mode
			}

			// Property should still exist
			expect((s as any)[LICENSE_PROPERTY_NAME]).toBe(true);
		});

		it("should prevent reconfiguration", () => {
			const s = styleframe();
			markLicenseRequired(s);

			// Attempt to reconfigure
			expect(() => {
				Object.defineProperty(s, LICENSE_PROPERTY_NAME, {
					value: false,
					writable: true,
				});
			}).toThrow();
		});

		it("should throw in strict mode when attempting to change value", () => {
			"use strict";
			const s = styleframe();
			markLicenseRequired(s);

			expect(() => {
				(s as any)[LICENSE_PROPERTY_NAME] = false;
			}).toThrow();
		});
	});

	describe("property descriptor", () => {
		it("should have correct property descriptor", () => {
			const s = styleframe();
			markLicenseRequired(s);

			const descriptor = Object.getOwnPropertyDescriptor(
				s,
				LICENSE_PROPERTY_NAME,
			);
			expect(descriptor).toBeDefined();
			expect(descriptor?.value).toBe(true);
			expect(descriptor?.writable).toBe(false);
			expect(descriptor?.configurable).toBe(false);
			expect(descriptor?.enumerable).toBe(true);
		});
	});

	describe("multiple instances", () => {
		it("should mark multiple instances independently", () => {
			const s1 = styleframe();
			const s2 = styleframe();

			markLicenseRequired(s1);

			expect((s1 as any)[LICENSE_PROPERTY_NAME]).toBe(true);
			expect((s2 as any)[LICENSE_PROPERTY_NAME]).toBeUndefined();
		});

		it("should not affect unmarked instances", () => {
			const s1 = styleframe();
			const s2 = styleframe();
			const s3 = styleframe();

			markLicenseRequired(s1);
			markLicenseRequired(s3);

			expect((s1 as any)[LICENSE_PROPERTY_NAME]).toBe(true);
			expect((s2 as any)[LICENSE_PROPERTY_NAME]).toBeUndefined();
			expect((s3 as any)[LICENSE_PROPERTY_NAME]).toBe(true);
		});
	});

	describe("edge cases", () => {
		it("should not interfere with other non-enumerable properties", () => {
			const s = styleframe();

			// Add another non-enumerable property
			Object.defineProperty(s, "__customProp", {
				value: "custom",
				writable: false,
				enumerable: false,
				configurable: false,
			});

			markLicenseRequired(s);

			expect((s as any)[LICENSE_PROPERTY_NAME]).toBe(true);
			expect((s as any).__customProp).toBe("custom");
		});

		it("should not throw when called multiple times on same instance", () => {
			const s = styleframe();

			markLicenseRequired(s);

			// Calling it again should not throw, just silently return
			expect(() => {
				markLicenseRequired(s);
			}).not.toThrow();
		});

		it("should handle empty object", () => {
			const s = styleframe();

			expect(Object.keys(s)).toHaveLength(0);

			markLicenseRequired(s);

			expect((s as any)[LICENSE_PROPERTY_NAME]).toBe(true);
		});
	});
});

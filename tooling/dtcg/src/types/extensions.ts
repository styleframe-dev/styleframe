/**
 * `$extensions` carry tool/vendor-specific metadata. Format Module §8.
 *
 * Keys MUST follow reverse-DNS naming (`com.example.tool`). Tools are
 * required to round-trip unknown extensions unchanged.
 */
export interface DTCGExtensions {
	[reverseDnsNamespace: string]: unknown;
}

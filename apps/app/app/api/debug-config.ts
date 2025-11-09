export default defineEventHandler((event) => {
	const config = useRuntimeConfig();

	// Only expose public config for security
	return {
		public: config.public,
		// Optionally add useful info
		env: process.env.NODE_ENV,
		timestamp: new Date().toISOString(),
	};
});

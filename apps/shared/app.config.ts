export default defineAppConfig({
	myLayer: {},
});

declare module "@nuxt/schema" {
	interface AppConfigInput {
		myLayer?: {};
	}
}

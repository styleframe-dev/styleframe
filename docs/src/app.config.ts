export default defineAppConfig({
	/**
	 * @docs https://www.docus.dev/concepts/configuration#global-configuration
	 */
	seo: {
		title: "styleframe",
		description:
			"Write composable, type-safe, future-proof Design Systems code using styleframe's powerful TypeScript CSS API.",
	},
	/**
	 * @docs https://www.docus.dev/concepts/configuration#header
	 */
	header: {
		title: "styleframe",
		logo: {
			alt: "Styleframe Logo",
			light: "/logotype-light.svg",
			dark: "/logotype-dark.svg",
		},
	},
	/**
	 * @docs https://www.docus.dev/concepts/configuration#socials-links
	 */
	socials: {
		x: "https://x.com/styleframe_dev",
	},
	/**
	 * @docs https://www.docus.dev/concepts/configuration#github-integration
	 */
	github: {
		url: "https://github.com/styleframe-dev/styleframe",
		branch: "main",
	},
	footer: {
		credits: `Copyright © ${new Date().getFullYear()} styleframe`,
	},
	toc: {
		// Title of the main table of contents
		title: "Table of Contents",
		// Customize links
		bottom: {
			// Title of the bottom table of contents
			title: "Community",
			// URL of your repository content folder
			edit: "https://github.com/styleframe-dev/styleframe/edit/main/docs/content",
			links: [
				{
					icon: "i-lucide-star",
					label: "Star on GitHub",
					to: "https://github.com/styleframe-dev/styleframe",
					target: "_blank",
				},
				{
					icon: "i-simple-icons-nuxtdotjs",
					label: "Purchase a license",
					to: "https://www.styleframe.dev/pro/purchase",
					target: "_blank",
				},
			],
		},
	},
	ui: {
		colors: {
			primary: "teal",
		},
	},
});

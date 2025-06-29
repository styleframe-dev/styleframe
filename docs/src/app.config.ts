export default defineAppConfig({
	/**
	 * @docs https://www.docus.dev/concepts/configuration#global-configuration
	 */
	seo: {
		title: "styleframe",
		description: "",
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
		// Update bottom left credits
		credits: `Copyright © ${new Date().getFullYear()} UXFront`,
		// Show or hide the color mode button
		colorMode: false,
		// Customize links
		links: [
			{
				icon: "i-simple-icons-nuxtdotjs",
				to: "https://nuxt.com",
				target: "_blank",
				"aria-label": "Nuxt Website",
			},
			{
				icon: "i-simple-icons-discord",
				to: "https://discord.com/invite/ps2h6QT",
				target: "_blank",
				"aria-label": "Nuxt UI on Discord",
			},
			{
				icon: "i-simple-icons-x",
				to: "https://x.com/nuxt_js",
				target: "_blank",
				"aria-label": "Nuxt on X",
			},
			{
				icon: "i-simple-icons-github",
				to: "https://github.com/nuxt/ui",
				target: "_blank",
				"aria-label": "Nuxt UI on GitHub",
			},
		],
	},
	toc: {
		// Title of the main table of contents
		title: "Table of Contents",
		// Customize links
		bottom: {
			// Title of the bottom table of contents
			title: "Community",
			// URL of your repository content folder
			edit: "https://github.com/nuxt-ui-pro/docs/edit/main/content",
			links: [
				{
					icon: "i-lucide-star",
					label: "Star on GitHub",
					to: "https://github.com/nuxt/ui",
					target: "_blank",
				},
				{
					icon: "i-lucide-book-open",
					label: "Nuxt UI Pro docs",
					to: "https://ui.nuxt.com/getting-started/installation/pro/nuxt",
					target: "_blank",
				},
				{
					icon: "i-simple-icons-nuxtdotjs",
					label: "Purchase a license",
					to: "https://ui.nuxt.com/pro/purchase",
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

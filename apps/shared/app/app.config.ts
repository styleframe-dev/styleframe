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
		discord: "https://discord.com/invite/KCVwuGz44M",
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
		title: "On this page",
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
					icon: "i-material-symbols:award-star",
					label: "Purchase a license",
					to: "https://www.styleframe.dev/pricing",
					target: "_blank",
				},
			],
		},
	},

	ui: {
		colors: {
			primary: "teal",
			neutral: "zinc",
		},
		commandPalette: {
			slots: {
				input: "[&_.iconify]:size-4 [&_.iconify]:mx-0.5",
				itemLeadingIcon: "size-4 mx-0.5",
			},
		},
		contentNavigation: {
			slots: {
				linkLeadingIcon: "size-4 mr-1",
				linkTrailing: "hidden",
			},
			defaultVariants: {
				variant: "link",
			},
		},
		pageLinks: {
			slots: {
				linkLeadingIcon: "size-4",
				linkLabelExternalIcon: "size-2.5",
			},
		},
		pageCard: {
			slots: {
				root: "rounded-xl",
			},
		},
		pricingTable: {
			slots: {
				tierTitle:
					"text-highlighted text-2xl sm:text-3xl text-pretty font-semibold",
			},
		},
	},
});

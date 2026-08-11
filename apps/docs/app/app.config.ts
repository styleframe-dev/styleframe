export default defineAppConfig({
	/**
	 * Styleframe branding for the docs site. The `@uxfront/layer-docs` layer
	 * ships neutral defaults; these values are merged over them by Nuxt's
	 * `defu` layer merge (consumer wins).
	 *
	 * @docs https://www.docus.dev/concepts/configuration#global-configuration
	 */
	seo: {
		title: "styleframe",
		titleTemplate: "%s - styleframe",
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
		// Header CTA nav — brand data read by the theme's AppHeaderCTA.
		links: [
			{
				label: "Docs",
				to: "/docs/getting-started/introduction",
				activeMatch: "/docs",
			},
			{
				label: "Changelog",
				to: "/changelog",
				activeMatch: "/changelog",
			},
			{
				label: "Log in",
				to: "https://app.styleframe.dev",
			},
		],
	},
	/**
	 * Frameworks offered by the sidebar select and the in-content
	 * `FrameworkSwitcher`, in display order. `value` is the MDC slot name used
	 * in content (`#react`, `#other`, `#vue`) and the persisted preference
	 * token. The layer ships no default list — which frameworks styleframe
	 * documents is a styleframe fact — so this array is the only source.
	 */
	docsTheme: {
		frameworks: [
			{ value: "react", label: "React", icon: "i-mdi-react" },
			{ value: "other", label: "Vanilla", icon: "i-mdi-language-typescript" },
			{ value: "vue", label: "Vue", icon: "i-mdi-vuejs" },
		],
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
		// Path from the repository root to this Nuxt app. The layer builds the
		// "Edit this page" href as
		// `{url}/edit/{branch}/{rootDir}/content/{stem}.{extension}`; with
		// `rootDir` unset the segment is dropped and every link 404s, because the
		// content lives at `apps/docs/content/`, not `content/`.
		rootDir: "apps/docs",
	},
	footer: {
		credits: `Copyright © ${new Date().getFullYear()} styleframe`,
		// Footer legal links read by the theme's AppFooterCenter.
		links: [
			{
				label: "Privacy",
				to: "/privacy",
			},
			{
				label: "Terms",
				to: "/terms",
			},
			{
				label: "License",
				to: "/license",
			},
		],
	},
	toc: {
		// Title of the main table of contents
		title: "On this page",
		// Customize links
		bottom: {
			title: "Resources",
			edit: "https://github.com/styleframe-dev/styleframe/edit/main/docs/content",
			links: [
				{
					icon: "i-simple-icons-storybook",
					label: "Storybook",
					to: "https://storybook.styleframe.dev",
					target: "_blank",
				},
				{
					icon: "i-simple-icons-playwright",
					label: "Playground",
					to: "https://play.styleframe.dev",
					target: "_blank",
				},
				{
					icon: "i-lucide-star",
					label: "Star on GitHub",
					to: "https://github.com/styleframe-dev/styleframe",
					target: "_blank",
				},
				{
					icon: "i-lucide-file-text",
					label: "Changelog",
					to: "https://github.com/styleframe-dev/styleframe/blob/main/CHANGELOG.md",
					target: "_blank",
				},
				{
					icon: "i-simple-icons-discord",
					label: "Community",
					to: "https://discord.com/invite/KCVwuGz44M",
					target: "_blank",
				},
			],
		},
	},

	// Palette only — the Nuxt UI Pro component slot overrides are neutral shell
	// defaults inherited from the `@uxfront/layer-docs` layer (merged under this by defu).
	ui: {
		colors: {
			primary: "teal",
			neutral: "zinc",
		},
	},
});

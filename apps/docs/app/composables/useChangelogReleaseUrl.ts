/**
 * Builds the GitHub release URL for a changelog entry.
 *
 * Most releases are tagged `styleframe@<version>` (the changesets convention),
 * so the URL is derived from the version. The two earliest releases (1.0.0,
 * 2.0.0) predate that convention and carry a bare tag — they set `releaseUrl`
 * in their frontmatter, which wins. The repo base comes from the shared
 * `app.config.ts` `github.url` so there is one source of truth for it.
 */
export const useChangelogReleaseUrl = () => {
	const { github } = useAppConfig();
	// `github` is typed as `false | {…}` by the shared Docus layer; this app's
	// app.config.ts always sets the object, so read the url when present.
	const repoUrl = typeof github === "object" ? github.url : "";

	return (entry: { version: string; releaseUrl?: string | null }) =>
		entry.releaseUrl || `${repoUrl}/releases/tag/styleframe@${entry.version}`;
};

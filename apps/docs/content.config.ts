import { defineDocsCollections } from "@uxfront/layer-docs/content";
import { DOCS_SECTIONS } from "./app/constants/sections";

// Section topology lives in `app/constants/sections.ts`; the collection shapes,
// per-locale fan-out and schemas live in the layer. `changelog` adds the
// locale-independent release-history collection read by `/changelog` and
// `/changelog/<version>`.
export default defineDocsCollections(DOCS_SECTIONS, {
	sitemap: true,
	changelog: true,
});

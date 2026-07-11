# The Styleframe Kitchen

> *"Faites simple."* — Auguste Escoffier, who organized the modern kitchen

This directory defines the AI agent team that builds Styleframe inside [Multica](https://multica.ai). It contains everything needed to stand the team up: a charter (this file), nine agent definitions with paste-ready system instructions (`agents/`), and eighteen skills in the Anthropic Agent Skills format (`skills/`) that Multica can import directly from this repository's GitHub URLs — eleven brigade skills plus the seven-skill recipe chain.

The team is organized as a *brigade de cuisine*. This is not decoration: Escoffier's brigade was the original parallel-execution system — one menu, many stations, each run by a cook with a distinct craft, every plate checked at the pass before it leaves. Styleframe is a design-system engine whose core concept is literally the *recipe*; the team that builds it cooks the same way. Mise — who has been expediting the recipe chain solo — steps up to run the whole house; the brigade completes the kitchen, and the maître d' opens the room.

---

## Why the team is shaped like this

AI agents are not junior developers, and a team of them should not be organized like a human org chart. Five principles shape this roster:

1. **Seats are context boundaries, not job titles.** An agent's output quality is bounded by how coherent its working context is. Each seat is one mental model that fits in one head: the base (Roux), the mother sauces (Mère), the curriculum (Larousse), the seams (Tournant), the quality bar (Étoile), the products (Famille), the research portfolio (Staj), the rail of tickets (Mise). No seat needs to hold two models at once.

2. **Cooks never grade their own plates.** Language models are systematically generous to their own output. Verification is therefore a dedicated seat (Étoile) with adversarial instructions and the standing authority to block. Nothing merges reviewed only by its author.

3. **Personality is an operating parameter, not flavor.** Each personality is chosen to bias against its seat's natural failure mode: Roux is terse because engine changes should shrink, not grow; Larousse is warm because documentation drifts toward jargon; Étoile is formal because reviews drift toward rubber stamps; Staj is theoretical because research drifts toward hype; Maître is evidence-first because developer marketing dies the moment it overclaims. A side benefit: nine distinct voices make a mixed human/agent timeline instantly scannable.

4. **Knowledge must compound outside context windows.** Agents forget everything between tasks. The skills in `skills/` are the team's persistent memory — they already encode hard-won, non-obvious lessons from this codebase (modifier-registry selectors, utility decomposition, variant-axis ordering, tsdown pitfalls, fresh-workspace build order). Every agent carries a standing rule: **a lesson that cost you more than fifteen minutes gets PR'd into your skill file.** The team gets smarter per task, not per model release.

5. **Parallelism needs fences, not meetings.** Agents run concurrent tasks in one repository. Coordination is structural: path-based ownership, small single-owner issues, dependency links for anything that collides, and explicit handoff mentions — never two cooks in the same pan at once. An @-mention is itself the dispatch mechanism — the named agent wakes immediately and starts working — so agents mention a teammate only when the work is ready for them to pick up, and use plain names (Étoile, not @etoile) everywhere else.

The human — Alex — is the chef-owner and the taste function: sets the menu, arbitrates RFCs, merges. Mise (the coordination seat, operated by Claude) converts the menu into tickets the stations can fire.

---

## The mission

Styleframe's engine is mature (core 3.6, transpiler 3.4, CLI 4.1, plugin across 9 bundlers, 39 recipes, ~90 utility composables, Playwright integration across 3 browsers). "True potential" is therefore not a rewrite — it is four fronts, each with a clear owner:

| Front | What it means concretely | Lead |
|---|---|---|
| **1. Component parity** | Close the recipe gap with the best UI kits: toast, table, combobox, date-picker, stepper, carousel, tree, rating, timeline, file-upload, empty-state… — each through the full 6-step recipe chain | Mère |
| **2. Unbeatable DX** | Docs that teach (migration guides, framework-specific examples), a playground worth sharing, error messages with recovery paths, fast feedback everywhere | Larousse, Tournant, Famille |
| **3. Commercial Pro** | A real customer dashboard (today it is a license-activation portal — built on Tailwind, violating our own dogfooding rule), fluid design tokens, premium composables | Famille, Staj |
| **4. Engine headroom** | Modern CSS (container queries, anchor positioning, view transitions), output performance vs Tailwind, zero-regression discipline | Roux, Staj |

---

## The brigade

| Handle | Kitchen role | Seat | Owns (paths) |
|---|---|---|---|
| **@mise** | Head chef at the pass — *mise en place* itself | Direction & triage | `.multica/**`, the backlog itself |
| **@roux** | The base every sauce is built on | Engine | `engine/**` |
| **@mere** | Keeper of the mother sauces (Mère) | Design language: tokens, utilities, recipes | `theme/**`, `apps/storybook/**` |
| **@larousse** | The *Gastronomique* — the book that teaches the cuisine | Documentation | `apps/docs/**` |
| **@tournant** | The swing cook — runs every station in the house | Integrations, tooling, releases | `tooling/**`, `config/**`, `.github/**`, `.changeset/**`, root workspace config |
| **@etoile** | The star — the inspector's currency (Étoile) | Quality: review, tests, benchmarks | `testing/**` + review authority everywhere |
| **@famille** | The family meal — the kitchen eats its own cooking | Products: dashboard, playground, shared layer | `apps/app/**`, `apps/playground/**`, `apps/shared/**` |
| **@staj** | The permanent stagiaire — always in someone else's kitchen | Research & RFCs | No code — issues and RFCs only |
| **@maitre** | The maître d' — front of house, fills the book | Marketing & story | No code — briefs, launches, announcements |

Full definitions with paste-ready system instructions: [`agents/`](./agents/).

---

## The operating system

### Issue lifecycle

```
Alex / any agent files idea
  → @mise triages: scope, acceptance criteria, single owner, priority
    → owner claims, comments a plan, moves to In Progress
      → owner works inside their fences; blockers reported the moment they appear
        → owner comments verification evidence (commands + outcomes), opens PR
          → @etoile reviews adversarially (prose-only docs → @larousse; Larousse's own prose → @mise; Étoile's testing/** → @roux)
            → Alex merges → owner closes with a summary comment
```

### Routing table

Issues route by the paths they touch. When a task spans two territories, Mise splits it — two issues, a dependency link, and a handoff mention. The full table lives in [`skills/triage-and-routing/SKILL.md`](./skills/triage-and-routing/SKILL.md).

### Standing handoff chains

- **New recipe:** @mere runs the `/create-recipe` chain (skills in this directory: research → design → implement → showcase → document → verify) → @etoile reviews → @larousse polishes the doc page.
- **Engine output change:** @roux flags any CSS/TS/DTS shape change → @etoile reruns the integration matrix → @tournant checks bundler adapters.
- **Friction report:** @famille hits a papercut eating the family meal → files a send-back → @mise routes it to the owning seat.
- **RFC:** @staj writes it → Alex + @mise decide → @mise decomposes into issues.
- **Release:** @tournant owns changesets and version PRs → @mise approves release notes.
- **Release announcement:** @tournant fires @maitre when a release publishes → @maitre drafts the announcement and channel posts → Alex publishes (external channels are always his hand).

### Definition of done (team-wide)

1. Acceptance criteria in the issue are met — demonstrably, with commands and their output in a comment.
2. Tests exist for new behavior; the affected packages' suites pass.
3. Docs updated when public behavior changed; a changeset added when a publishable package changed.
4. Reviewed by someone who isn't the author.
5. No changes outside the issue's scope (skill amendments under `.multica/skills/` are always in scope — the compounding rule).

---

## Setting it up in Multica

**1. Import the eighteen skills.** In Multica → Skills → Import from GitHub, paste each directory URL (Multica extracts the `SKILL.md` and companion files):

```
https://github.com/styleframe-dev/styleframe/tree/main/.multica/skills/styleframe-team-protocol
https://github.com/styleframe-dev/styleframe/tree/main/.multica/skills/styleframe-verification
https://github.com/styleframe-dev/styleframe/tree/main/.multica/skills/triage-and-routing
https://github.com/styleframe-dev/styleframe/tree/main/.multica/skills/engine-craft
https://github.com/styleframe-dev/styleframe/tree/main/.multica/skills/recipe-craft
https://github.com/styleframe-dev/styleframe/tree/main/.multica/skills/docs-craft
https://github.com/styleframe-dev/styleframe/tree/main/.multica/skills/integration-craft
https://github.com/styleframe-dev/styleframe/tree/main/.multica/skills/adversarial-review
https://github.com/styleframe-dev/styleframe/tree/main/.multica/skills/dogfood-and-report
https://github.com/styleframe-dev/styleframe/tree/main/.multica/skills/rfc-method
https://github.com/styleframe-dev/styleframe/tree/main/.multica/skills/marketing-craft
https://github.com/styleframe-dev/styleframe/tree/main/.multica/skills/create-recipe
https://github.com/styleframe-dev/styleframe/tree/main/.multica/skills/research-recipe
https://github.com/styleframe-dev/styleframe/tree/main/.multica/skills/design-recipe
https://github.com/styleframe-dev/styleframe/tree/main/.multica/skills/implement-recipe
https://github.com/styleframe-dev/styleframe/tree/main/.multica/skills/showcase-recipe
https://github.com/styleframe-dev/styleframe/tree/main/.multica/skills/document-recipe
https://github.com/styleframe-dev/styleframe/tree/main/.multica/skills/verify-recipe
```

**2. Create the nine agents.** For each file in `agents/`: create an agent with that name, runtime **Claude Code**, paste the *System instructions* block, attach the skills listed in its *Multica configuration* section, and set the model/concurrency from the same section. Visibility: workspace.

**3. Create the squad.** Group all nine under **@mise** as leader, so unassigned issues route through triage instead of being picked up at random.

**4. File the cold-start backlog** below and assign as noted. Service is on.

**5. Keep skills synced (ongoing).** Multica reads skills at import time, not from git: a merged edit under `.multica/skills/` is not live until the skill is re-imported. Re-importing is part of merging — when Alex merges a PR that touches `.multica/skills/`, he re-imports (or edits in the Multica UI) the affected skills before the next task starts; @mise reminds him on the PR. Until then, the lesson exists only in git, not in the team's working memory.

---

## Cold-start backlog

Twelve real issues, grounded in the current state of the repository (surveyed 2026-07-11). File these first:

1. **@tournant — Expose the bun adapter through the barrel.** `@styleframe/plugin` ships a `bun` adapter, but the `styleframe` barrel (the only sanctioned import surface) has no `src/plugin/bun.ts` and no `./plugin/bun` export — `import styleframe from 'styleframe/plugin/bun'` fails today (verified 2026-07-11). *Accept: every adapter importable as `styleframe/plugin/<bundler>` or explicitly documented as unsupported.*
2. **@mere — `toast` recipe.** The single biggest gap in the 39-recipe library; multi-part (root/title/description/action/dismiss), needs a positioning story. Run the full `/create-recipe` chain. *Accept: recipe + tests + story + doc page + `pnpm --filter @styleframe/theme test` green.*
3. **@mere — `table` recipe.** Second-biggest gap; multi-part, Container color pattern. *Accept: same as above.*
4. **@roux — Unit tests for `engine/loader`.** The only engine package with zero unit tests (8 source files: config, module, jiti, build, HMR). *Accept: happy-path + failure-path tests per module, wired into `pnpm --filter @styleframe/loader test`.*
5. **@famille — EPIC: dogfood the dashboard.** `apps/app` is built on Nuxt UI + Tailwind 4 — our own rule says all apps use Styleframe. Migrate incrementally (auth pages first), filing a send-back for every capability gap found. *This epic is the single best product-feedback generator we have.*
6. **@larousse — Migration guide: Tailwind → Styleframe.** Highest-intent audience we have; map utility vocabulary, config, and recipes side by side. *Accept: published page under `09.integrations`, all examples compile.*
7. **@staj — RFC: modern-CSS modifiers.** Container queries, `@property`, anchor positioning, view transitions: what should become first-class modifiers/utilities vs stay escape-hatch. *Accept: RFC issue per `rfc-method` template with a recommendation.*
8. **@staj — Competitive teardown.** Tailwind v4, Panda CSS, StyleX, vanilla-extract: feature/DX/output-size matrix, where Styleframe wins, where it must not lose. *Accept: teardown doc + top-5 gap list handed to @mise.*
9. **@etoile — Adversarial audit of the newest recipe wave.** sidebar (15 sub-parts), calendar, color-picker, otp shipped fast; audit against the recipe-craft checklist and extend the integration matrix to cover one recipe end-to-end in a real bundler build. *Accept: findings filed as issues; one recipe asserted in `testing/integration`.*
10. **@famille — Playground shareable URLs.** Serialize editor state to the URL so docs and social posts can deep-link live examples. *Accept: round-trip share link works in a production build.*
11. **@maitre — Positioning canon v1.** `marketing-craft` ships with a canon v0 drafted from the repo survey; refine it with Alex — what / for whom / three lead claims, each paired with a runnable proof — and fold in the teardown's win/lose map when #8 lands. *Accept: canon merged into `.multica/skills/marketing-craft/SKILL.md` with Alex's sign-off, every lead claim carrying a working proof link.*
12. **@maitre — Launch the Tailwind migration guide.** Pairs with #6: copy brief for the guide's landing angle, release-announcement draft, channel plan (thread + Show HN comment, affiliation disclosed), playground deep-link if #10 has shipped. *Accept: brief filed for @larousse, announcement draft ready for Alex, every claim canon-backed, all code samples compile.*

---

*A kitchen this organized should taste its own cooking: when the brigade's own process creaks — tickets bounce between stations, reviews bottleneck at the pass, skills drift stale — that is a ticket for @mise, same as any bug.*

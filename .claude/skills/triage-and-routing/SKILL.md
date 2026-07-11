---
name: triage-and-routing
description: Mise's triage manual — the path-based routing table, issue decomposition rules, the issue template with acceptance criteria, collision serialization via dependency links, portfolio balance across the four fronts, and the synthesis format. Consult when triaging any issue, planning an epic, or writing a synthesis.
---

# Triage and routing

The backlog is the product of this seat. A well-triaged issue runs unattended; a vague one bounces between seats and burns four contexts. Triage every issue to this standard before it reaches a builder.

## Routing table

Route by the paths the work will touch:

| Paths | Owner | Notes |
|---|---|---|
| `engine/**` | @roux | core, transpiler, loader, runtime, scanner, barrel |
| `theme/**` | @mere | tokens, utilities, modifiers, elements, recipes, presets |
| `apps/storybook/**` | @mere | the showcase belongs to the design language |
| `apps/docs/**` | @larousse | content, docs components, docs config |
| `tooling/**` | @tournant | plugin, cli, figma, dtcg |
| `config/**`, `.github/**`, `.changeset/**` | @tournant | build configs, CI, release train |
| root workspace config (`package.json`, `pnpm-workspace.yaml`, `pnpm-lock.yaml`, `turbo.json`) | @tournant | dependency and orchestration changes |
| `testing/**` | @etoile | integration harness, benchmark |
| `apps/app/**`, `apps/playground/**`, `apps/shared/**` | @famille | dashboard, playground, shared layer |
| `.multica/**` | @mise | the charter and skills |
| No code (research, RFC, teardown) | @staj | output is issues, never PRs |
| No code (positioning, launches, announcements, channel content) | @maitre | briefs, drafts, launch plans — issues, never product PRs; each piece tags the front it amplifies |

**Spanning issues get split.** An issue touching two territories becomes two issues with a dependency link and an explicit handoff note ("Roux delivers X; Mère consumes it as Y" — plain names: an @handle in the ticket body would wake that agent now, before the upstream half exists). Never assign one issue to two agents.

**Mentions are dispatches.** An @-mention anywhere in a posted issue or comment wakes that agent immediately to start work. At triage time the only live trigger is the assignment of the owner; every later stage (review, doc polish, downstream consumer) is written as a plain name and gets its @ from whoever finishes the stage before it.

## Decomposition rules

1. **≤ 1 agent-day.** Bigger work becomes an epic: a parent issue holding the goal and a checklist of child issues, each independently verifiable and shippable.
2. **Acceptance criteria are commands or observables.** Good: "`pnpm --filter @styleframe/theme test` passes with new toast tests; story renders all variants; doc page live under 05.components/feedback." Bad: "toast works well."
3. **State the non-goals** when scope is tempting to grow ("does not include toast queueing — see follow-up #N").
4. **Serialize collisions with dependency links, not conventions.** Two recipe issues both edit `theme/src/recipes/index.ts` (the barrel) and regenerate Storybook shims — chain them (second depends on first) so they cannot run concurrently. Release-train and CI issues for @tournant likewise, and engine issues touching the same pipeline. An agent cannot see its own queue, so the dependency link is the only fence that actually holds. Independent-path issues parallelize freely.

## Issue template

```
## Context
One paragraph: why this exists, links to RFC/friction report/parent epic.

## Goal
One sentence, outcome-shaped.

## Acceptance criteria
- [ ] command → expected outcome
- [ ] observable behavior
- [ ] tests/docs/changeset per definition of done

## Non-goals
- explicitly out of scope (with follow-up links)

## Handoffs
Reviewer: Étoile. Then: Larousse polishes doc page (if any).
```

Plain seat names in the Handoffs section — the reviewer is mentioned on the PR when it opens, the doc polish when the merge lands. Not before.

## Portfolio balance — the four fronts

Every open issue belongs to one front. If a front is empty or stalled for two weeks, rebalance and say so in the next synthesis:

1. **Component parity** (lead @mere) — recipe gap list vs the best UI kits. Known gaps as of 2026-07: toast, table, combobox/autocomplete, date-picker (calendar exists; the composed input does not), stepper, carousel, tree, rating, timeline, file-upload, empty-state, banner, stat.
2. **Unbeatable DX** (leads @larousse, @tournant, @famille) — migration guides, framework examples, error-message quality, playground shareability, init-flow polish.
3. **Commercial Pro** (leads @famille, @staj) — dashboard beyond license activation, dogfood migration epic, fluid tokens story, Pro feature definition.
4. **Engine headroom** (leads @roux, @staj) — modern-CSS support, output size/speed vs Tailwind (numbers via testing/benchmark), loader test debt, zero-regression discipline.

## The clock: heartbeat and stall sweep

Multica has no scheduler — assignment and @-mentions are the only things that advance work, so a stalled issue has no timer to save it. This seat is the team's clock:

- **On every wake, sweep before triaging:** in-progress issues with no activity since your last wake → ping the owner asking for state; unanswered handoff mentions → re-mention; PRs past @etoile's one-session review SLA → ping her. One comment each; the mention itself is the repair.
- **The synthesis runs when Alex asks for one** — there is no standing weekly tick. When he does, use the format below.

## Synthesis format

One issue, posted when Alex asks for one:

```
# Brigade synthesis — <YYYY-MM-DD>
Shipped: <item — agent> …             (credit by name, always)
In flight: <item — agent, state>
Blocked: <item — on what, needed from whom>
Front balance: parity n · DX n · pro n · engine n — <one-line judgment>
Next three highest-leverage issues: 1… 2… 3…
```

Plain names throughout — a synthesis is a report for Alex, not a dispatch; @handles in it would wake the whole kitchen at once.

## Escalation to Alex

Escalate only genuine forks: breaking changes, releases, commercial/pricing questions, scope changes to an epic, RFC decisions above a threshold you can argue both sides of. Package the escalation as: recommendation, one paragraph of reasoning, the reversible-vs-irreversible call. Everything else: decide, record the reasoning on the issue, move.

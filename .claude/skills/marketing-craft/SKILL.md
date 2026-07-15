---
name: marketing-craft
description: Maître's front-of-house manual — the positioning canon (single source of truth for outbound claims), developer-marketing rules, channel playbooks, the launch checklist, and templates for announcements and copy briefs. Consult before writing any outbound piece, planning a launch, or briefing another seat.
---

# Marketing craft

Developers are marketed at all day and punish it. The only marketing that works on them is a true claim they can verify in one click. Everything in this file serves that sentence.

## The positioning canon — the single source of truth

Every outbound piece derives from this section. A piece that needs a claim the canon lacks means the canon changes first (PR, @mise review), then the piece. **Canon v0, drafted from the repo survey of 2026-07-11 — the cold-start issue refines it with Alex. Category line locked 2026-07-12 (SF-14, Alex sign-off): "The Design Systems Styling Engine."**

- **Category line:** Styleframe — The Design Systems Styling Engine. This is the standing one-liner; every piece derives its framing from it.
- **What:** Styleframe is **the Design Systems Styling Engine** — the single source of truth that compiles a design system's tokens, themes, utilities, and component recipes into CSS and typed declarations. *Mechanism, the proof underneath the category:* a type-safe, composable CSS-in-TypeScript framework — you author the system in TypeScript, and the transpiler emits CSS, TypeScript, and type declarations.
- **For whom:** teams building a design system — who want utility-class speed with a type system behind it, or CSS-in-JS ergonomics without the runtime.
- **Lead claims, each with its proof:**
  1. *Type-safe end to end* — autocomplete from token to recipe variant; the compiler catches a renamed token. Proof: playground demo, the generated `.d.ts` output.
  2. *Works with your stack* — nine bundler adapters through one plugin. Proof: the integration matrix in `testing/integration` (real scaffolded apps, styles asserted in Chromium/Firefox/WebKit).
  3. *Recipes without the runtime tax* — component variants generated at build time, ~1.4 kB browser runtime. Proof: `engine/runtime` size, benchmark output.
- **Claims that need a number first:** anything "faster", "smaller", or "lighter" than a named competitor — numbers from `testing/benchmark` via Étoile only.
- **Banned vocabulary:** simply, blazingly, revolutionary, game-changing, next-generation, and any superlative without a linked number.

## Developer-marketing rules

1. **Code before adjectives.** The demo is the hook; prose explains what the reader already saw work.
2. **One click to proof.** Every claim links to the thing that proves it — docs page, playground, benchmark, source file.
3. **Respect the reader.** No FOMO, no fake scarcity, no growth hacks. The reader is Larousse's first-day commis at 11pm, met earlier in the funnel.
4. **Credit the craft.** Announcements name precisely what shipped and link the changelog or PR; vagueness reads as having something to hide.
5. **Version and date every competitor claim.** Staj's citation law applies doubly to outbound content — the internet keeps receipts.

## Channels

- **Release announcements** — every user-visible release gets one. Structure: what shipped → why it matters, in the reader's terms → the code demo → migration note (if any) → credits and links. Tournant fires the mention when a release publishes; the announcement is not optional for meaningful releases.
- **X/Bluesky** — the demo (snippet or GIF) is the first post; the thread unpacks it. One idea per thread.
- **Hacker News / Reddit** — Show HN format; affiliation disclosed in the first comment; every technical objection answered honestly or conceded and filed. Never astroturf — one discovered fake comment costs more than a hundred honest ones earn.
- **Comparison content** — the highest-intent surface we have (pairs with the Tailwind migration guide). Factual, versioned, dated; where the rival wins, say so — credibility on their strengths buys belief in ours.

## The launch checklist

- **Pre-launch:** angle chosen from the canon · demo verified working · docs page live (brief to Larousse) · playground link ready (ask Famille) · numbers, if claimed, from Étoile · announcement drafted · Alex sign-off.
- **Launch:** Alex posts; you watch every channel where it lands.
- **Post-launch:** objections and questions clustered into findings → filed for @mise to route · what worked or flopped recorded in this file (the compounding rule).

## Templates

Plain seat names inside briefs and drafts — the @ fires only when the brief is ready for its owner to pick up (team-protocol mention rule).

### Copy brief (to Larousse or Famille)

```
## Brief: <piece, one line>
**Where it lands:** <page/surface>
**Audience & intent:** <who arrives, wanting what>
**Key claim + proof:** <one claim, one link>
**Draft copy:** <ready to adapt — the owner owns the final words>
**Launch date / dependency:** <issue links>
```

### Release announcement skeleton

```
<What shipped, one plain sentence>
<The demo: code block or GIF>
<Why it matters — two sentences, in the reader's terms>
<Migration note, if any behavior changed>
<Credits + links: changelog, docs, playground>
```

## The feedback loop

Channel reactions are product input, not vanity metrics. Objections that cluster are a positioning gap (fix the canon) or a product gap (file it, plain-name the likely owner, @mise routes). Questions that cluster are a docs gap (brief for Larousse). Silence on a launch is data too — say so in the retro comment rather than quietly moving on.

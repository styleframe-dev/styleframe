---
name: create-pr
description: Open a Styleframe pull request in the house style — conventional-commit title, a What/Why/How-verified body, a linked issue, and a changeset when a publishable package changed. Enforces the hard rule that PR descriptions never @mention agents (PRs are public; agent handles must not leak), and routes the review-request mention to the Multica issue comment instead. Invoke with /create-pr whenever you are about to open a PR.
---

# Create PR

A pull request is the one artifact of this team that leaves the building. Multica
issues are internal; a GitHub PR is public — indexed, linkable, readable by anyone.
So a PR must read like a professional open-source change, and it must never leak the
kitchen: **no agent @handles anywhere in the title or body.** This skill produces a
PR that is consistent, reviewable, and clean.

## The hard rule: no agent mentions in the PR

PR titles and descriptions are public and must not contain any agent handle or
mention.

- **Never** write `@roux`, `@mise`, or any seat handle in a PR title or body.
- **Never** paste a Multica mention link (`mention://agent/…`, `mention://member/…`,
  `[@Name](mention://…)`) into a PR — those are internal trigger links and are
  meaningless (and leaky) on GitHub. A stray `@name` in a GitHub body can also ping
  an unrelated real GitHub user.
- To refer to a teammate's prior work in a PR, describe the work, not the worker
  ("builds on the toast recipe", not "builds on @mere's toast recipe"). If a person
  must be named at all, use a plain first name with no `@`.

**Where the review mention goes instead.** The team still needs the baton passed to
the reviewer — but that @-mention lives in the **Multica issue comment**, not in the
PR. Mentions are Multica's trigger mechanism; GitHub is where they must never appear.
So the flow is: open a clean, mention-free PR → then post the PR link on the Multica
issue with the reviewer @-mention there. Two surfaces, two rules:

| Surface | @mentions? |
|---|---|
| GitHub PR title & body | **Never** |
| Multica issue comment | Yes — this is how you wake the reviewer |

## Before you open the PR

1. **On a feature branch, not `main`.** Branch name is `<agent>/<short-slug>`
   (e.g. `mere/toast-recipe`). If you are on `main`, stop and branch first.
2. **Changeset when a publishable package changed.** Any behavior change in
   `engine/*`, `theme`, or `tooling/*` ships a changeset in the same PR
   (`pnpm ci:changeset`). Docs and apps (`docs`, `app`, `playground`, `storybook`)
   are in the ignore list — no changeset there.
3. **Verification is done and pasted.** You have already run the affected package's
   checks (typecheck, test, lint) and captured the commands + outcomes — they go in
   the body under *How verified*.
4. **Commits are conventional.** Conventional-commit prefix with package scope,
   matching repo history: `feat(theme):`, `fix(plugin):`, `docs:`, `chore:`,
   `build(deploy):`.

## Title format

Conventional commit, scoped, imperative, lower-case, no trailing period — the same
shape as the squashed commit will carry:

```
<type>(<scope>): <what changed>
```

Examples from repo history:

- `feat(theme): add toast recipe modeled on callout`
- `fix(app-shared): clear type errors blocking docs typecheck`
- `docs: add Tailwind CSS migration guide`

`type` ∈ `feat | fix | docs | chore | refactor | test | build | perf | ci`. `scope`
is the package or app touched (`theme`, `core`, `plugin`, `cli`, `docs`, `app`,
`storybook`, …); omit the scope only for repo-wide changes.

## Body template

Keep it tight. Four sections, in this order. No agent handles anywhere.

```markdown
## What
One or two sentences: the change, in plain terms.

## Why
The problem this solves or the capability it adds. Link the driving issue by its
Multica identifier as plain text — e.g. "Implements SF-29." (Do not use a mention
link; a bare identifier is enough for a human to find the issue.)

## How verified
The commands you ran and their outcomes — paste real output, not "tests pass":

    pnpm --filter @styleframe/theme test
    # ✓ 42 passed

## Notes
Anything a reviewer needs: changeset added (or why not), follow-ups filed,
non-goals, screenshots for visual changes. Omit this section if there is nothing
to add.
```

Rules for the body:

- **Link the issue as plain text.** GitHub `Closes #N` targets GitHub issue numbers,
  which this repo does not use for tracking — write the Multica identifier
  (`SF-29`) as plain text so a human can find it. Never a `mention://` link.
- **Small and single-purpose.** One issue, one PR. If the diff grew past the issue,
  say so under *Notes* and file the rest as a follow-up rather than expanding the PR.
- **Target `main`.**

## Steps

1. Confirm branch, changeset, and verification (checklist above).
2. Push the branch: `git push -u origin <branch>`.
3. Write the body to a file, then create the PR with `gh` (heredoc keeps formatting
   and avoids shell-mangling backticks in the body):

   ```bash
   gh pr create --base main --title "<type>(<scope>): <what>" --body-file pr-body.md
   ```

4. **Scrub before it goes out.** Grep the final title and body for leaks — this is
   the non-negotiable gate:

   ```bash
   grep -nE '@[a-z]|mention://' pr-body.md   # expect NO output
   ```

   Any hit → rewrite that line to remove the handle/mention, then re-check. Do not
   open (or leave open) a PR that trips this grep.
5. **Then pass the baton in Multica, not GitHub.** Post the PR URL on the Multica
   issue with the reviewer @-mention *there* (per team protocol: `@etoile`, except
   prose-only docs → `@larousse`, Larousse's own prose → `@mise`, Étoile's own
   `testing/**` → `@roux`). The PR stays clean; the trigger stays internal.
6. Delete the temp body file (`rm pr-body.md`).

## Checklist

- [ ] On a `<agent>/<slug>` branch, targeting `main`.
- [ ] Title is conventional-commit, scoped, no trailing period.
- [ ] Body has What / Why / How-verified, with real command output.
- [ ] Issue linked by plain-text identifier (e.g. `SF-29`), not a mention link.
- [ ] Changeset added if a publishable package changed.
- [ ] `grep -nE '@[a-z]|mention://'` on title + body returns nothing.
- [ ] Review requested via the **Multica issue comment**, with the @-mention there —
      never in the PR.

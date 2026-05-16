---
"@styleframe/theme": patch
"styleframe": patch
---

Fix `chat-message` recipe `side="end"` alignment.

The `side="end"` variant now correctly packs the avatar and content group to the right side of the container. Three issues were resolved:

- Root recipe: `justify-content` was `flex-end` which, combined with `flex-direction: row-reverse`, pushed items to the left. Changed to `flex-start`.
- Content recipe: added `side` variant with `alignSelf: flex-end` so the bubble right-aligns within its column stack.
- Actions recipe: added `side` variant with `justifyContent: flex-end` so action buttons align under the bubble.

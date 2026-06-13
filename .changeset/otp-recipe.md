---
"@styleframe/theme": minor
"styleframe": minor
---

Add OTP recipe with shared field surface abstraction.

Adds `useOtpRecipe` and `useOtpCellRecipe` for styling one-time password inputs. The cell recipe targets a single `<input>` with `:focus-visible` ring and supports the full color × variant × size matrix matching Input/Textarea parity.

Extracts `fieldSurfaceCompoundVariants()` from `createFieldRecipe` so the OTP cell can share the same nine color×variant surface declarations without duplication.

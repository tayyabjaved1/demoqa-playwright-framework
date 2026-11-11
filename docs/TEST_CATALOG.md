# Test Catalog

This is a human-readable index of the current sample automation. Keep it synchronized with the actual spec files. A test is not `Implemented` unless its spec exists and is executable in the configured project.

| Area | Spec | Scenario | Tags / suite | Status |
|---|---|---|---|---|
| Elements | `src/specs/elements/text-box.spec.ts` | Submit generated text-box data and verify displayed output | `@smoke` `@ui` (native `test.describe` tag) | Implemented |
| Forms | `src/specs/forms/practice-form.spec.ts` | Submit generated student form data and verify confirmation | `@regression` `@ui` (native `test.describe` tag) | Implemented |
| Book Store | `src/specs/bookstore/bookstore-api.spec.ts` | Create account/token and exercise book collection API flow | `@api` `@regression` (native `test.describe` tag) | Implemented |
| Factories | `src/specs/factories/factory.spec.ts` | Verify generated data and factory customization behavior | `@regression` (native `test.describe` tag) | Implemented |

## Rules

- Add a row for every new spec or meaningful scenario.
- Update the scenario description when assertions or preconditions change.
- Remove rows when tests are deleted; do not leave deleted tests listed as active coverage.
- If a test is skipped or blocked, state that explicitly and explain why.
- Link detailed module-level coverage from that module's `docs/MODULE_CATALOG.md` section when the table becomes large.

# Changelog

Notable framework changes are recorded here. Keep entries concise and include migration notes for breaking changes.

## 1.3.1 - Module READMEs

- Added `src/modules/<module>/README.md` for all four sample modules (Elements,
  Forms, Book Store, Factories), following `docs/templates/MODULE_README.template.md`:
  scope, navigation, architecture, test data, lifecycle/cleanup, automated coverage,
  run command, known limitations. `docs/MODULE_CATALOG.md` links to each.
- Each README documents the per-module quirks found while verifying 1.3.0: the
  Permanent Address field's missing accessible name, the datepicker/modal raw-selector
  fallbacks, and which `StudentData` fields (`subjects`, `hobbies`, state/city) exist
  but aren't yet driven by the Practice Form spec.
- Updated `docs/templates/MODULE_README.template.md` itself so future modules inherit
  the same bar by default: the Page Objects prompt now asks authors to confirm
  `BasePage`/`waitForLoaded()` compliance (§5a), the Automated coverage prompt asks for
  each scenario's native `test.describe({ tag: [...] })` value, and the Known
  limitations prompt asks authors to call out any raw-selector fallback and why (§6).
- Brought all four module READMEs' wording in line with those same template prompts
  (explicit §5a/§6 citations, explicit "native tag option, not title-embedded" note).
- Migration: none — documentation only; `npm run typecheck` and the full suite
  (6 passed) were re-verified unchanged after this pass.

## 1.3.0 - Page readiness, selector policy compliance, native tags

- `BasePage` gained an abstract `waitForLoaded()` and a concrete `open()` (navigate +
  dismiss DemoQA's ad overlay + wait until ready); `TextBoxPage`/`PracticeFormPage`
  now implement it instead of exposing a bare `goto(path)`.
- Added `src/core/ad-overlay.ts`: best-effort removal of DemoQA's ad banner/iframes,
  a known source of click interception on this public demo site.
- `TextBoxPage` and `PracticeFormPage` now follow the selector policy that
  `docs/ARCHITECTURE.md` §6 already documented but the sample code didn't:
  role/label/placeholder first, with the remaining raw-id fallbacks documented inline.
- All four sample specs switched from tags embedded in the test title string to
  Playwright's native `test.describe(..., { tag: [...] })`, and UI/API specs are now
  broken into named `test.step()` calls for per-step failure attribution.
- Migration: none required — `--grep @tag` filtering and `npm run test:*` scripts
  behave the same with native tags.

## 1.2.0 - Documentation governance

- Added a Documentation as Code policy and change impact matrix.
- Added factory, module, test, and requirement traceability catalogs.
- Added fixture, API, and configuration guides.
- Added a pull request checklist and a CI documentation-change guard.

## 1.1.0 - Initial architecture documentation

- Added architecture, data factory, and test authoring guides.
- Added contribution guidance.

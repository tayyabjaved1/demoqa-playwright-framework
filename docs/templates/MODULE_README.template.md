# <Module Name>

## Scope
What user-visible capability does this module cover?

## Navigation
- Entry route:
- Preconditions:
- Required role/account:

## Architecture
- Page Objects: (name each; confirm it extends `BasePage` and implements `waitForLoaded()` anchored on its own elements — see `docs/ARCHITECTURE.md` §5a)
- Components:
- Factories/builders:
- API clients:

## Test data
Describe generated fields, required constraints, uniqueness, overrides, and static reference data.

## Lifecycle and cleanup
Describe persisted resources, ownership, teardown, and unsupported cleanup cases.

## Automated coverage
Link to `docs/TEST_CATALOG.md` and list module-specific scenarios, each with its `test.describe` tag(s) (e.g. `@smoke @ui`) — set via Playwright's native `{ tag: [...] }` option, not embedded in the title string.

## Run
```bash
npx playwright test <path-to-module-tests>
```

## Known limitations
List environment dependencies, unstable demo-site behavior, and unimplemented scenarios. Call out any raw id/CSS selector fallback used because the element has no accessible role/label/placeholder (per the selector policy in `docs/ARCHITECTURE.md` §6) and why — e.g. a third-party widget, a field DemoQA gives no accessible name, a component library's unnamed container. Note any DemoQA quirk a future change here should watch for (ad-overlay interception, markup the page object works around, etc.).

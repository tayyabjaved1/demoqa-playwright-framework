# Elements

## Scope
The Elements section's Text Box widget: fill in a name, email and two addresses, submit, and verify DemoQA echoes the submitted values back in the output panel.

## Navigation
- Entry route: `/text-box`
- Preconditions: none — unauthenticated, public page.
- Required role/account: none.

## Architecture
- Page Objects: `pages/text-box.page.ts` (`TextBoxPage`) — extends `BasePage` and implements `waitForLoaded()`, anchored on the `Text Box` heading (see `docs/ARCHITECTURE.md` §5a). `open()` navigates, clears DemoQA's ad overlay, then waits for that heading before any action runs.
- Components: none yet.
- Factories/builders: `FormFactory.textBox()` (`src/data/factories/form.factory.ts`), injected as the `textBoxData` fixture.
- API clients: none — this module is UI-only.

## Test data
`TextBoxData` (`src/data/types/test-data.types.ts`): `fullName`, `email`, `currentAddress`, `permanentAddress`. Each factory call generates fresh values via `CommonGenerator` — no fixed personal data, no cross-test reuse.

## Lifecycle and cleanup
Nothing is persisted server-side; DemoQA just reflects the submitted form back on the same page. No teardown required.

## Automated coverage
See `docs/TEST_CATALOG.md`. One scenario: `src/specs/elements/text-box.spec.ts` — submit generated data, verify the output panel shows every field. Tagged `@smoke @ui` via `test.describe`'s native `{ tag: [...] }` option, not embedded in the title string.

## Run
```bash
npx playwright test src/specs/elements
```

## Known limitations
- Only the Text Box widget is implemented. Check Box, Radio Button, Web Tables, Buttons, Links, Broken Links/Images, Upload and Download, and Dynamic Properties are planned, not automated — see `docs/MODULE_CATALOG.md`.
- The **Permanent Address** field exposes no placeholder or accessible name on the live site (unlike every other field on the page) — `TextBoxPage.submit()` falls back to the raw `#permanentAddress` id for that one field; see the inline comment there and `docs/ARCHITECTURE.md` §6.
- DemoQA's ad banner/iframes can overlap this page and intercept clicks; `BasePage.open()` clears them best-effort before the page object acts (`src/core/ad-overlay.ts`), but a changed ad unit could still require an update there.

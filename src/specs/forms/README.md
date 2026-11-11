# Forms

## Scope
The Practice Form: submit a generated student profile (name, email, gender, mobile, date of birth, address) and verify the confirmation modal echoes it back.

## Navigation
- Entry route: `/automation-practice-form`
- Preconditions: none — unauthenticated, public page.
- Required role/account: none.

## Architecture
- Page Objects: `pages/practice-form.page.ts` (`PracticeFormPage`) — extends `BasePage` and implements `waitForLoaded()`, anchored on the `Practice Form` heading (see `docs/ARCHITECTURE.md` §5a). `open()` navigates, clears DemoQA's ad overlay, then waits for that heading before any action runs.
- Components: none yet.
- Factories/builders: `StudentFactory.create()` (`src/data/factories/student.factory.ts`), injected as the `student` fixture; `StudentBuilder` (`src/data/builders/student.builder.ts`) is available for scenario variants (gender, location, subjects) without a one-off factory per variant.
- API clients: none — this module is UI-only.

## Test data
`StudentData` (`src/data/types/test-data.types.ts`) extends `UserData` with `gender`, `mobile`, `dateOfBirth`, `subjects`, `hobbies`, `address`, `state`, `city`. `StudentFactory.create()` generates fresh values per call (unique email/username via `UserFactory`); `state`/`city` default to `'NCR'`/`'Delhi'`, override via the factory or `StudentBuilder.fromLocation()`.

## Lifecycle and cleanup
Nothing is persisted server-side; DemoQA renders the confirmation modal from the submitted form data only. No teardown required.

## Automated coverage
See `docs/TEST_CATALOG.md`. One scenario: `src/specs/forms/practice-form.spec.ts` — submit a generated profile, verify the confirmation modal shows name/email/mobile. Tagged `@regression @ui` via `test.describe`'s native `{ tag: [...] }` option, not embedded in the title string.

## Run
```bash
npx playwright test src/specs/forms
```

## Known limitations
- The sample only drives the fields required to reach the confirmation modal (name, email, gender, mobile, date of birth, current address). `subjects`, `hobbies`, and the state/city dropdowns exist on `StudentData` and in `StudentFactory`/`StudentBuilder` but are not yet exercised by `PracticeFormPage.submit()` or asserted in `expectSubmission()`.
- `#dateOfBirthInput` is a third-party `react-datepicker` field with no accessible label or placeholder — `PracticeFormPage` falls back to its raw id; see the inline comment there and `docs/ARCHITECTURE.md` §6.
- The confirmation modal (`.modal-content`) is Bootstrap markup with no distinguishing accessible name, so it's also a documented raw-selector fallback rather than `getByRole('dialog', ...)`.

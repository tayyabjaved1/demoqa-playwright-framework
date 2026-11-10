# Test Authoring Guide

## 1. Imports

Import the shared Playwright test and assertion API from the framework fixture:

```ts
import { test, expect } from '../../../fixtures/test.fixture';
```

Use the correct relative path from the module test folder.

## 2. Spec file conventions

- Name files `*.spec.ts`.
- Group related scenarios with `test.describe`.
- Write test titles as observable behaviour, e.g. `submits the practice form with valid student details`.
- Keep one main behaviour per test.
- Do not depend on test execution order or data created by another test.
- Declare tags on `test.describe` using Playwright's native `{ tag: [...] }` option
  (not embedded in the title string) — `@smoke`, `@regression` and `@api`,
  consistently with the package scripts.
- Split the test body into named `test.step()` calls — open, act, verify — so a
  failure attributes to a specific step in the report, not the test as a whole.

## 3. Example UI test

```ts
import { test } from '../../../fixtures/test.fixture';

test.describe('Practice Form', { tag: ['@regression', '@ui'] }, () => {
  test('submits a dynamically generated student profile', async ({ practiceFormPage, student }) => {
    await test.step('Open the Practice Form page', async () => {
      await practiceFormPage.open();
    });

    await test.step('Submit the generated student profile', async () => {
      await practiceFormPage.submit(student);
    });

    await test.step('Verify the confirmation modal shows the submitted profile', async () => {
      await practiceFormPage.expectSubmission(student);
    });
  });
});
```

Use the actual methods present on the Page Object — `open()` for navigation (it
waits until the page is ready; use `goto()` directly only when a test deliberately
inspects the page before it's loaded), and an `expect*` method for every assertion.
Do not put long locator chains or raw `expect(locator)` calls in the spec.

## 4. Page Object conventions

- One page object per meaningful page or workflow boundary.
- Every page object extends `BasePage` (`src/core/base-page.ts`): set `readonly path`,
  implement `waitForLoaded()` anchored on that page's own elements, and call `open()`
  from the spec (not `goto()`) so the ad overlay is cleared and the page is confirmed
  ready before any action runs.
- Keep locators private/read-only where practical.
- Follow the selector policy in `docs/ARCHITECTURE.md` §6 (role/label/placeholder
  first; a raw id/CSS fallback only when genuinely no semantic handle exists, with
  the reason documented inline).
- Expose intent-revealing methods (`submit`, `search`, `openDetails`) rather than low-level implementation details.
- Assertion methods are named `expect*` and contain the `expect(...)` — specs call
  these, never a raw `expect(locator)`.
- Reuse components for common navigation, dialogs, tables or menus.

## 5. API tests and setup

Use an API client for test setup only when the application exposes a supported endpoint and the test is allowed to use it. Validate API status and response data. Keep API setup/cleanup separate from UI interaction code.

The `bookStoreAccount` fixture is an example of a resource fixture: it provisions an account, yields it to the test, and attempts deletion in teardown.

## 6. Isolation and parallel safety

- Generate unique records per test.
- Avoid shared mutable accounts unless a test explicitly verifies shared-user behaviour.
- Do not rely on a record left by a previous test.
- Avoid hard-coded waits; use Playwright auto-waiting and web-first assertions.
- Keep parallel workers modest against public DemoQA infrastructure.

## 7. Before committing

Run:

```bash
npm run typecheck
npm test
```

For a focused test:

```bash
npx playwright test src/modules/forms/tests/practice-form.spec.ts
```

Inspect `playwright-report` and `test-results` when a test fails. Attach traces/screenshots to bug reports where useful.

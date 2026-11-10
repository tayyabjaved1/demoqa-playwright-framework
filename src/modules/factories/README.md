# Factories (Data Factory Engine checks)

## Scope
Unit-like checks of the data layer itself — not a DemoQA page or API. Verifies the factories every other module depends on actually generate unique data, support role presets/overrides, and compose fluently through builders.

## Navigation
- Entry route: none — no browser, no network.
- Preconditions: none.
- Required role/account: none.

## Architecture
- Page Objects: none.
- Components: none.
- Factories/builders exercised: `UserFactory` (create/admin/bookstoreUser), `StudentFactory.create()`, `StudentBuilder`.
- API clients: none.

## Test data
These tests call the factories directly (no fixture injection) to assert their own contract: fresh `id`/`email`/`username` per call, `UserFactory.admin()` setting `role: 'admin'`, override objects reaching the returned data, and `StudentBuilder`'s fluent chain (`withGender`/`fromLocation`/`withSubjects`) producing the same shape as the underlying factory.

## Lifecycle and cleanup
Nothing persisted — pure in-memory data generation. No teardown.

## Automated coverage
See `docs/TEST_CATALOG.md`. `src/modules/factories/tests/factory.spec.ts`, three scenarios: uniqueness, role presets/overrides, fluent builder composition. Tagged `@regression` via `test.describe`'s native `{ tag: [...] }` option, not embedded in the title string.

## Run
```bash
npx playwright test src/modules/factories/tests
```

## Known limitations
- Deliberately decoupled from `fixtures/test.fixture.ts` and the browser — these are checks on the factory layer in isolation, not on how a module consumes it.
- Covers `UserFactory`/`StudentFactory`/`StudentBuilder` only; `FormFactory` and `BookFactory` have no equivalent standalone checks yet (their behavior is currently exercised indirectly through the Elements, Forms, and Book Store specs).

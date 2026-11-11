# Framework Architecture

## 1. Goals

This repository is a reusable Playwright + TypeScript framework demonstrated against [DemoQA](https://demoqa.com). Its design goals are:

- keep test specs focused on behaviour and assertions;
- generate fresh runtime data rather than reusing hard-coded personal data;
- centralize common generation, fixtures, API helpers and browser configuration;
- organize UI code by business feature/module;
- make adding a test or module a convention-based task, not a framework rewrite.

This is a starter implementation, not a claim that every DemoQA feature is already automated. New feature-specific page objects, factories and specs are still required as coverage expands.

## 2. Layered architecture

```text
Spec files (tests / module tests)
        |
        v
Shared Playwright fixtures
  |          |             |
  v          v             v
Page       Runtime       API clients
Objects    factories     (setup/cleanup)
  |          |
  v          v
UI         Common generators
components + domain factories
        |
        v
Playwright config / browser / projects / reporters
```

### Responsibilities

| Layer | Location | Responsibility |
|---|---|---|
| Test/spec | `src/specs/**` | Scenario intent, actions orchestration and assertions |
| Page Objects | `src/pages/**` | Page-specific locators and user actions |
| Components | `src/pages/**/components` | Reusable widgets/sections shared by pages |
| Fixtures | `src/fixtures` | Create and inject per-test dependencies/data; manage lifecycle |
| Factories | `src/data/factories` | Build domain-shaped runtime test data |
| Generators | `src/data/generators` | Shared primitives such as UUID, email, name, phone and date |
| Builders | `src/data/builders` | Fluent composition of complex scenario data |
| Types/schemas | `src/data/types` | Compile-time contracts for test data |
| API clients | `src/api` | API operations used for setup, verification or teardown |
| Core | `src/core` | Small shared abstractions; avoid putting feature logic here |
| Config | `playwright.config.ts`, `.env.example` | Environments, timeouts, projects, retries and reporting |

## 3. Dependency rules

1. Specs may use fixtures, Page Objects, factories and API clients.
2. Page Objects may use Playwright `Page`/`Locator` and shared core helpers.
3. Factories may use generators and data types; they must not depend on the browser or UI.
4. Generators must remain domain-agnostic.
5. API clients must not import Page Objects.
6. Core must not import feature modules. Feature modules may depend on core.
7. Avoid circular dependencies and avoid putting assertions inside factories.

## 4. Test lifecycle

A normal UI test follows this lifecycle:

1. Playwright creates an isolated browser context/page.
2. The test fixture creates fresh data and Page Object instances for that test.
3. The spec navigates and performs actions through Page Objects.
4. The spec asserts observable outcomes.
5. Playwright closes the context and records configured artifacts on failure.

Each `test()` body is split into named `test.step()` calls (open, act, verify) so a
failure attributes to a specific step in the report instead of the test as a whole.

The `bookStoreAccount` fixture additionally creates an account through the Book Store API and deletes it in a `finally` block after the test. Cleanup is best-effort and depends on the public demo API remaining available.

## 5. Adding a module without changing global configuration

For a new module, add:

- `src/pages/<module>/*.page.ts`;
- `src/pages/<module>/components/*.component.ts` when reusable UI parts exist;
- `src/data/types` types and `src/data/factories` factory if the module needs domain data;
- `src/specs/<module>/*.spec.ts`.

Import `test` and `expect` from `src/fixtures/test.fixture.ts`. Factories can be imported directly, so a new domain factory does not require editing the global fixture or Playwright config. Add a typed fixture only when the dependency is broadly reused and its lifecycle belongs in the fixture layer.

## 5a. Page readiness and the ad overlay

Every page object extends `BasePage` (`src/core/base-page.ts`), which provides:

- `path` — the page's URL, relative to `baseURL`;
- `goto()` — raw navigation to `path`;
- `waitForLoaded()` — **abstract**; each page implements its own, anchored on that
  page's own elements (e.g. its heading);
- `open()` — `goto()` + a best-effort dismiss of DemoQA's ad banner/iframes
  (`src/core/ad-overlay.ts`) + `waitForLoaded()`. Specs call `open()`, not `goto()`,
  for real navigation — it is the only way a spec knows the page actually finished
  rendering before acting on it, and it clears DemoQA's known ad-overlay click
  interception up front rather than leaving each page object to rediscover it.

`AdOverlay.dismissIfPresent()` is incidental cleanup only (best-effort, swallows its
own errors) — never use it to verify behaviour under test.

## 6. Selector policy

Prefer, in order:

1. accessible role/name (`getByRole`);
2. label (`getByLabel`);
3. placeholder (`getByPlaceholder`);
4. stable element IDs or `data-testid` where available;
5. CSS only when semantic locators are not possible.

Avoid brittle positional selectors and XPath unless there is no reasonable alternative. DemoQA is a third-party demo site, so this repository cannot add `data-testid` attributes to its application markup. Where a raw id/CSS locator is genuinely the only handle (e.g. `#output`, a third-party datepicker input, a Bootstrap modal with no accessible name), the page object documents why inline — see `TextBoxPage` and `PracticeFormPage` for the applied examples.

## 6a. Test integrity — assert real behaviour, never just green

A passing test must fail when the feature breaks.

- Assert the user-facing outcome the test claims (the output panel shows the
  submitted values, the confirmation modal shows the student's name), not a proxy
  that merely correlates with it.
- Prefer Playwright's auto-waiting web-first assertions (`expect(locator).toContainText(...)`)
  over manual sleeps or polling raw state.
- A fallback never substitutes for the action under test — if a submission fails,
  the test must fail, never route around it to reach a green end state by another path.

## 7. Environment and secrets

- Set `BASE_URL` and `API_BASE_URL` in `.env` or the execution environment.
- Never commit real credentials or tokens.
- Keep demo accounts disposable; do not use personal credentials.
- Run against public demo environments with modest worker counts and no destructive load.

## 8. Known boundaries

- The public DemoQA site can change markup, rate-limit requests or be unavailable.
- Book Store catalog records are fixed by the application; `BookFactory` selects valid known catalog entries instead of inventing ISBNs.
- UI data generation does not itself create a backend record. Use a supported API or UI workflow to persist data.
- Not every DemoQA module is implemented in this starter yet.

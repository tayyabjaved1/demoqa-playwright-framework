# Module Catalog

Only modules with code in the repository are marked `Implemented`. Planned
modules must not be represented as completed automation. Centralized here
rather than one `README.md` per module, matching core-pw-e2e-tests' approach
(a handful of `docs/*.md` files, no per-module READMEs).

| Module | Current implementation | Coverage | Status |
|---|---|---|---|
| [Elements](#elements) | Text Box Page Object and spec | Submit values and verify output | Implemented (partial) |
| [Forms](#forms) | Practice Form Page Object and spec | Dynamic student data and form submission | Implemented (partial) |
| [Book Store](#book-store) | API client and API spec | Account/token and collection workflow | Implemented (partial) |
| [Factory checks](#factory-checks-data-factory-engine) | Factory behavior specs | Uniqueness, overrides and builder behavior | Implemented |
| Alerts, Frames & Windows | Not yet implemented | Planned | Planned |
| Widgets | Not yet implemented | Planned | Planned |
| Interactions | Not yet implemented | Planned | Planned |

All implemented modules' Page Objects follow the `BasePage` readiness contract
(`path` / `waitForLoaded()` / `open()`) and the role/label/placeholder selector
policy — see `docs/ARCHITECTURE.md` §5a and §6.

## Module conventions

Each implemented module keeps its Page Objects/components under
`src/pages/<module>/` and its specs under `src/specs/<module>/` — layer-first,
matching core-pw-e2e-tests' directory convention. Factories (only when
domain-specific data is needed) live in the shared `src/data/factories/`, not
inside the module folder. Module-level documentation (scope, architecture,
known limitations) lives centrally below, not in a per-module README.

Add a section below (copy the structure of an existing one) when a module is
introduced — see `docs/templates/MODULE_SECTION.template.md`.

---

## Elements

**Scope.** The Elements section's Text Box widget: fill in a name, email and
two addresses, submit, and verify DemoQA echoes the submitted values back in
the output panel.

**Navigation.** `/text-box`. No preconditions — unauthenticated, public page.

**Architecture.** `pages/text-box.page.ts` (`TextBoxPage`) — extends
`BasePage` and implements `waitForLoaded()`, anchored on the `Text Box`
heading (§5a). `open()` navigates, clears DemoQA's ad overlay, then waits for
that heading. Factory: `FormFactory.textBox()`
(`src/data/factories/form.factory.ts`), injected as the `textBoxData` fixture.
No components, no API clients (UI-only).

**Test data.** `TextBoxData` (`src/data/types/test-data.types.ts`):
`fullName`, `email`, `currentAddress`, `permanentAddress`. Each factory call
generates fresh values via `CommonGenerator` — no fixed personal data, no
cross-test reuse.

**Lifecycle.** Nothing persisted server-side; DemoQA just reflects the
submitted form back on the same page. No teardown required.

**Coverage** (`src/specs/elements/text-box.spec.ts`): submit generated data,
verify the output panel shows every field — `@smoke @ui`.

**Known limitations.**
- Only the Text Box widget is implemented. Check Box, Radio Button, Web
  Tables, Buttons, Links, Broken Links/Images, Upload and Download, and
  Dynamic Properties are planned, not automated.
- The **Permanent Address** field exposes no placeholder or accessible name
  on the live site (unlike every other field) — `TextBoxPage.submit()` falls
  back to the raw `#permanentAddress` id for that one field (§6).
- DemoQA's ad banner/iframes can overlap this page and intercept clicks;
  `BasePage.open()` clears them best-effort (`src/core/ad-overlay.ts`), but a
  changed ad unit could still require an update there.

## Forms

**Scope.** The Practice Form: submit a generated student profile (name,
email, gender, mobile, date of birth, address) and verify the confirmation
modal echoes it back.

**Navigation.** `/automation-practice-form`. No preconditions —
unauthenticated, public page.

**Architecture.** `pages/practice-form.page.ts` (`PracticeFormPage`) —
extends `BasePage`, `waitForLoaded()` anchored on the `Practice Form` heading
(§5a). `open()` navigates, clears the ad overlay, then waits. Factory:
`StudentFactory.create()` (`src/data/factories/student.factory.ts`), injected
as the `student` fixture; `StudentBuilder`
(`src/data/builders/student.builder.ts`) is available for scenario variants
(gender, location, subjects) without a one-off factory per variant. No
components, no API clients.

**Test data.** `StudentData` (`src/data/types/test-data.types.ts`) extends
`UserData` with `gender`, `mobile`, `dateOfBirth`, `subjects`, `hobbies`,
`address`, `state`, `city`. `StudentFactory.create()` generates fresh values
per call (unique email/username via `UserFactory`); `state`/`city` default to
`'NCR'`/`'Delhi'`, override via the factory or `StudentBuilder.fromLocation()`.

**Lifecycle.** Nothing persisted server-side; DemoQA renders the confirmation
modal from the submitted form data only. No teardown required.

**Coverage** (`src/specs/forms/practice-form.spec.ts`): submit a generated
profile, verify the confirmation modal shows name/email/mobile —
`@regression @ui`.

**Known limitations.**
- The sample only drives the fields required to reach the confirmation modal
  (name, email, gender, mobile, date of birth, current address). `subjects`,
  `hobbies`, and the state/city dropdowns exist on `StudentData` and in
  `StudentFactory`/`StudentBuilder` but aren't yet exercised by
  `PracticeFormPage.submit()` or asserted in `expectSubmission()`.
- `#dateOfBirthInput` is a third-party `react-datepicker` field with no
  accessible label or placeholder — falls back to its raw id (§6).
- The confirmation modal (`.modal-content`) is Bootstrap markup with no
  distinguishing accessible name, so it's also a documented raw-selector
  fallback rather than `getByRole('dialog', ...)`.

## Book Store

**Scope.** The Book Store API: create a disposable account, generate an auth
token, add a catalog book to the account's collection, and verify it
appears — end to end, no UI.

**Navigation.** No entry route — API-only, driven against `API_BASE_URL`.
Requires outbound network access to the public DemoQA API. No persistent
account — each test provisions and tears down its own.

**Architecture.** No Page Objects (never touches the browser). Factories:
`UserFactory.bookstoreUser()` (account credentials), `BookFactory.catalog()` /
`BookFactory.first()` (known catalog ISBNs). API client: `BookStoreClient`
(`src/api/bookstore.client.ts`) — `createAccount`, `addBook`, `getBooks`,
`deleteAccount`; every call checks `response.ok()` and throws with status +
body on failure.

**Test data.** `bookStoreAccount` is an automatic fixture
(`src/fixtures/test.fixture.ts`): calls `BookStoreClient.createAccount()` with
a fresh `UserFactory.bookstoreUser()` before the test and `deleteAccount()` in
a `finally` after it. `bookCatalog` yields `BookFactory.catalog()` — DemoQA's
catalog is fixed, so the factory selects known valid ISBNs rather than
fabricating invalid ones.

**Lifecycle.** The account created by `bookStoreAccount` is deleted in
`finally` regardless of test outcome. `deleteAccount()` tolerates a `404`
(already gone) but throws on any other failure — cleanup is real, not
silently swallowed.

**Coverage** (`src/specs/bookstore/bookstore-api.spec.ts`): add a catalog
book to a fresh account, verify it's in the collection — `@api @regression`.

**Known limitations.**
- Hits the live public DemoQA API; availability, rate limits, and response
  shape are outside this repo's control.
- Catalog ISBNs are fixed by the application — `BookFactory` intentionally
  reuses known records instead of generating new ones.
- No search, update, or multi-book removal scenarios yet — only
  add-and-verify.

## Factory checks (Data Factory Engine)

**Scope.** Unit-like checks of the data layer itself — not a DemoQA page or
API. Verifies the factories every other module depends on actually generate
unique data, support role presets/overrides, and compose fluently through
builders.

**Navigation.** No entry route — no browser, no network.

**Architecture.** No Page Objects, no components, no API clients. Factories
exercised: `UserFactory` (create/admin/bookstoreUser), `StudentFactory.create()`,
`StudentBuilder`.

**Test data.** These tests call the factories directly (no fixture injection)
to assert their own contract: fresh `id`/`email`/`username` per call,
`UserFactory.admin()` setting `role: 'admin'`, override objects reaching the
returned data, and `StudentBuilder`'s fluent chain (`withGender`/
`fromLocation`/`withSubjects`) producing the same shape as the underlying
factory.

**Lifecycle.** Nothing persisted — pure in-memory data generation. No
teardown.

**Coverage** (`src/specs/factories/factory.spec.ts`), three scenarios:
uniqueness, role presets/overrides, fluent builder composition — all
`@regression`.

**Known limitations.**
- Deliberately decoupled from `fixtures/test.fixture.ts` and the browser —
  these are checks on the factory layer in isolation, not on how a module
  consumes it.
- Covers `UserFactory`/`StudentFactory`/`StudentBuilder` only; `FormFactory`
  and `BookFactory` have no equivalent standalone checks yet (their behavior
  is currently exercised indirectly through the Elements, Forms, and Book
  Store specs).

# Book Store

## Scope
The Book Store API: create a disposable account, generate an auth token, add a catalog book to the account's collection, and verify it appears — end to end, no UI.

## Navigation
- Entry route: none — API-only module, driven against `API_BASE_URL`.
- Preconditions: outbound network access to the public DemoQA API.
- Required role/account: none persistent — each test provisions and tears down its own account.

## Architecture
- Page Objects: none — this module never touches the browser.
- Components: none.
- Factories/builders: `UserFactory.bookstoreUser()` (`src/data/factories/user.factory.ts`) for account credentials; `BookFactory.catalog()` / `BookFactory.first()` (`src/data/factories/book.factory.ts`) for known catalog ISBNs.
- API clients: `BookStoreClient` (`src/api/bookstore.client.ts`) — `createAccount`, `addBook`, `getBooks`, `deleteAccount`. Every call checks `response.ok()` and throws with status + body on failure.

## Test data
`bookStoreAccount` is an automatic fixture (`src/fixtures/test.fixture.ts`): it calls `BookStoreClient.createAccount()` with a fresh `UserFactory.bookstoreUser()` before the test and `deleteAccount()` in a `finally` after it. `bookCatalog` yields `BookFactory.catalog()` — DemoQA's Book Store catalog is fixed, so the factory selects known valid ISBNs rather than fabricating invalid ones.

## Lifecycle and cleanup
The account created by `bookStoreAccount` is deleted in `finally` regardless of test outcome. `deleteAccount()` tolerates a `404` (account already gone) but throws on any other failure — cleanup is real, not silently swallowed.

## Automated coverage
See `docs/TEST_CATALOG.md`. One scenario: `src/modules/bookstore/tests/bookstore-api.spec.ts` — add a catalog book to a fresh account, verify it's in the collection. Tagged `@api @regression` via `test.describe`'s native `{ tag: [...] }` option, not embedded in the title string.

## Run
```bash
npx playwright test src/modules/bookstore/tests
```

## Known limitations
- Hits the live public DemoQA API; availability, rate limits, and response shape are outside this repo's control.
- Catalog ISBNs are fixed by the application — `BookFactory` intentionally reuses known records instead of generating new ones.
- No search, update, or multi-book removal scenarios yet — only add-and-verify.

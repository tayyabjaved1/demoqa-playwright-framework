# DemoQA Playwright Automation Framework

A modular Playwright + TypeScript starter implementation demonstrating dynamic runtime data, reusable factories, fixtures, Page Objects, API helpers, test tags and CI reporting against https://demoqa.com.

## Documentation

- [Architecture and layer responsibilities](docs/ARCHITECTURE.md)
- [Runtime data factories, generators and builders](docs/DATA_FACTORY_GUIDE.md)
- [How to author tests and Page Objects](docs/TEST_AUTHORING_GUIDE.md)
- [Contribution rules](CONTRIBUTING.md)
- [Documentation as Code policy](docs/DOCUMENTATION_POLICY.md)
- [Change impact matrix](docs/CHANGE_IMPACT_MATRIX.md)
- [Factory catalog](docs/FACTORY_CATALOG.md)
- [Module catalog](docs/MODULE_CATALOG.md)
- [Test catalog](docs/TEST_CATALOG.md)
- [Requirement traceability](docs/TRACEABILITY.md)
- [Fixture lifecycle guide](docs/FIXTURE_GUIDE.md)
- [API guide](docs/API_GUIDE.md)
- [Configuration guide](docs/CONFIGURATION.md)
- [Changelog](docs/CHANGELOG.md)

## Requirements
- Node.js 20+
- npm

## Setup
```bash
npm install
npx playwright install chromium
cp .env.example .env
```

## Run
```bash
npm test                 # all configured tests
npm run test:smoke        # smoke-tagged tests
npm run test:regression   # regression-tagged tests
npm run test:api          # API-tagged tests
npm run test:ui           # UI-tagged tests
npm run typecheck         # TypeScript validation
npm run docs:check        # enforce documentation updates for changed code
npm run report            # open HTML report
```

## Architecture
- `src/data/generators`: shared Faker-based primitives.
- `src/data/factories`: domain-specific data factories with per-call unique values and override support.
- `src/data/builders`: fluent builders for complex scenario data.
- `src/fixtures`: Playwright fixtures that inject generated data, Page Objects and API helpers into tests.
- `src/core`: shared abstractions such as BasePage.
- `src/modules`: feature-oriented Page Objects and specs.
- `src/api`: API clients for test setup and teardown.

## Add a new module
1. Add domain types in `src/data/types`.
2. Add a factory under `src/data/factories` using `CommonGenerator` for shared primitives.
3. Add a Page Object under `src/modules/<module>/pages`.
4. Use the shared typed fixtures where available, or import the domain factory directly in a new spec. Adding a new factory does not require changing Playwright configuration; add a typed fixture only if the team wants it injected automatically.
5. Add specs under `src/modules/<module>/tests` and import `test` from the shared fixture.

## Data strategy
- Each factory call creates fresh data; UUID-based emails/usernames reduce collisions.
- Use overrides for scenario-specific values rather than duplicating factories.
- Use builders when a scenario needs a readable combination of multiple overrides.
- `bookStoreAccount` is an automatic fixture: it creates a DemoQA API account and deletes it in `finally` after the test.
- DemoQA's book catalog is fixed, so `BookFactory` selects known catalog ISBNs rather than fabricating invalid ISBNs.

## Important limitations / notes
- DemoQA is a public demo site, so availability, ads/overlays, rate limits and API behavior can change. Run against it responsibly and avoid high worker counts.
- The sample Practice Form covers the core required fields. More widgets (subjects, hobbies, state/city selection, file upload) can be added as additional Page Object methods and scenarios.
- The sample Book Store API test uses the public account/token endpoints. It needs outbound network access when tests are run.
- UI selectors are based on DemoQA's current public markup and may need adjustment if the site changes.
- No application source-code changes or new `data-testid` attributes are assumed; the implementation uses stable IDs/labels where available.

## Current sample coverage

- Elements: Text Box
- Forms: Practice Form
- Book Store: API account and collection flow
- Factory checks: data uniqueness/overrides/builders (where asserted by the sample tests)

The remaining DemoQA sections (Alerts, Frames, Windows, Widgets and Interactions) are planned extensions, not yet implemented in this starter.

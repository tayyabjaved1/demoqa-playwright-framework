# Contributing

1. Read `README.md`, `docs/ARCHITECTURE.md`, `docs/DATA_FACTORY_GUIDE.md` and `docs/TEST_AUTHORING_GUIDE.md` before adding tests.
2. Follow the dependency rules in the architecture guide.
3. Generate fresh data through existing generators/factories; do not duplicate random-data logic in specs.
4. Add types for new domain data and use factory overrides for scenario variations.
5. Keep tests isolated and safe for parallel execution.
6. Use Page Objects for page interactions and reusable components for repeated UI regions.
7. Add API setup/teardown only when supported by the target application.
8. Run typecheck and the relevant tests before submitting changes.
9. Never commit `.env`, credentials, tokens, generated reports or test artifacts.

When a new module is added, update the README's coverage section and add module-specific tests. Do not edit global Playwright configuration unless the new requirement is truly cross-cutting (for example, a new browser project or reporter).


## Documentation is part of the change

Follow [the Documentation as Code policy](docs/DOCUMENTATION_POLICY.md) and [change impact matrix](docs/CHANGE_IMPACT_MATRIX.md). Update the relevant guides and catalogs in the same PR as the code. The PR template contains the required checklist. Run `npm run docs:check` before submitting. This automated check is a guardrail; reviewers must still verify that the documentation accurately describes the implementation.

# Factory Catalog

This catalog lists factories currently present in the starter implementation. Update it whenever a factory is added, changed, renamed, or removed.

| Factory | Location | Purpose | Uniqueness / constraints | Cleanup owner | Status |
|---|---|---|---|---|---|
| StudentFactory | `src/data/factories/student.factory.ts` | Generate student profile data for forms | Per-call generated email and generated profile fields; overrides may intentionally repeat values | Test/application flow; no persisted record by factory alone | Implemented |
| FormFactory | `src/data/factories/form.factory.ts` | Generate practice form data | Uses shared generators; validate against DemoQA form constraints | UI test; form is transient | Implemented |
| UserFactory | `src/data/factories/user.factory.ts` | Generate user/account data and role variants | UUID-backed unique identifiers; role is configurable | Book Store API fixture for persisted accounts | Implemented |
| BookFactory | `src/data/factories/book.factory.ts` | Select valid book catalog data | Uses known DemoQA catalog ISBNs; does not invent catalog records | Book Store API fixture/test | Implemented |

## Shared generators and builders

| Component | Location | Responsibility |
|---|---|---|
| CommonGenerator | `src/data/generators/common.generator.ts` | Shared Faker/UUID-backed primitives |
| StudentBuilder | `src/data/builders/student.builder.ts` | Fluent composition of student data overrides |
| FactoryRegistry | `src/core/factory-registry.ts` | Central access to supported factory constructors |

## Adding a factory

1. Define a domain type in `src/data/types/`.
2. Reuse `CommonGenerator` for shared primitives.
3. Add a factory test for uniqueness, defaults, overrides, and invalid input where relevant.
4. Add the factory to the registry only if centralized resolution is required.
5. Add a row to this catalog and update `DATA_FACTORY_GUIDE.md`.
6. Document persistence and cleanup ownership. A factory that only creates an in-memory object does not create or clean up a backend record.

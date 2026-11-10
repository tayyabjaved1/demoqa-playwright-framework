# Requirement-to-Test Traceability

Use stable requirement IDs so changes to test names do not silently break coverage references. For this demo starter, IDs are illustrative framework-level IDs and should be refined as additional scenarios are implemented.

| Requirement ID | Requirement / behavior | Automated test | Status |
|---|---|---|---|
| ELM-TB-001 | User can submit text-box details and see the submitted values | `src/modules/elements/tests/text-box.spec.ts` | Implemented |
| FRM-PF-001 | User can submit a valid practice form | `src/modules/forms/tests/practice-form.spec.ts` | Implemented |
| BKS-API-001 | A Book Store API user can be created and authenticated | `src/modules/bookstore/tests/bookstore-api.spec.ts` | Implemented |
| BKS-API-002 | Authenticated user can manage a book collection | `src/modules/bookstore/tests/bookstore-api.spec.ts` | Implemented |
| DAT-FAC-001 | Factories produce fresh unique identifiers and support overrides | `src/modules/factories/tests/factory.spec.ts` | Implemented |

Each test above is now broken into named `test.step()` calls (open, act, verify);
the requirement mapping is unchanged, but a future failure's step name in the report
should be read alongside this table to see which part of the requirement broke.

## Traceability rules

- Give each meaningful scenario a stable requirement ID.
- Keep requirement-to-test links current when specs are renamed, split, merged, or removed.
- Mark requirements with no automation as `Not automated` or `Blocked`; never imply coverage.
- A removed test must either be replaced with a new mapping or have its requirement marked as no longer applicable with rationale.

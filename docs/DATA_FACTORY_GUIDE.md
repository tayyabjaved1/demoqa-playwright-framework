# Runtime Data Factories Guide

## 1. What a factory does

A factory creates a fresh, correctly shaped test-data object at runtime. It does **not** automatically insert that data into the application. Persisting data requires a UI workflow or an API supported by the application.

In this project:

- `CommonGenerator` provides reusable primitive values.
- Domain factories compose those primitives into objects such as users and students.
- Builders make complex scenario variations readable.
- Fixtures create fresh factory results for each test and inject them into the test function.

## 2. Current implementation

| File | Purpose |
|---|---|
| `src/data/generators/common.generator.ts` | UUID, names, email, username, password, phone, address, date, integer and random choice |
| `src/data/factories/user.factory.ts` | Generic users and role variants |
| `src/data/factories/student.factory.ts` | Student profile data |
| `src/data/factories/form.factory.ts` | Text Box form data |
| `src/data/factories/book.factory.ts` | Valid fixed DemoQA catalog records |
| `src/data/builders/student.builder.ts` | Fluent student scenario composition |
| `src/data/types/test-data.types.ts` | TypeScript data contracts |
| `src/fixtures/test.fixture.ts` | Per-test data and helper injection |

## 3. Generate data directly

```ts
import { StudentFactory } from '../../data/factories/student.factory';

const student = StudentFactory.create();
const anotherStudent = StudentFactory.create();
```

Each call generates new values. The email includes a UUID to reduce collision risk. Random names and other fields can coincidentally repeat; uniqueness is guaranteed only for fields explicitly built with a unique identifier.

## 4. Overrides

Use overrides for scenario-specific values. Do not create a second factory for every small variation.

```ts
const student = StudentFactory.create({
  gender: 'Female',
  state: 'NCR',
  city: 'Delhi',
  subjects: ['Maths', 'Physics'],
});
```

The factory's generated defaults are used for fields not overridden.

## 5. Roles

```ts
import { UserFactory } from '../../data/factories/user.factory';

const studentUser = UserFactory.create();
const adminUser = UserFactory.admin();
const bookstoreUser = UserFactory.bookstoreUser();
```

A role is test data, not proof of authorization. The application must actually assign and enforce that role for role-based access tests to be meaningful.

## 6. Builders

Use a builder when a scenario needs several related overrides and readability improves:

```ts
import { StudentBuilder } from '../../data/builders/student.builder';

const applicant = new StudentBuilder()
  .withGender('Female')
  .fromLocation('NCR', 'Delhi')
  .withSubjects('Maths', 'Computer Science')
  .build();
```

## 7. Use factory data through fixtures

The shared fixture extends Playwright's `test` object:

```ts
import { test, expect } from '../../../fixtures/test.fixture';

test('uses a fresh student', async ({ page, student }) => {
  // `student` is created for this test invocation.
  await page.goto('/automation-practice-form');
  // Use the student object with the relevant Page Object.
});
```

Fixture values are test-scoped by default in Playwright unless explicitly configured otherwise. Do not store mutable test data in module-level global variables.

## 8. Add a new factory

Example for an order domain:

```ts
import { CommonGenerator as gen } from '../generators/common.generator';

export interface OrderData {
  orderId: string;
  quantity: number;
  reference: string;
}

export class OrderFactory {
  static create(overrides: Partial<OrderData> = {}): OrderData {
    return {
      orderId: gen.id(),
      quantity: gen.integer(1, 5),
      reference: `qa-${gen.id()}`,
      ...overrides,
    };
  }
}
```

Then import it in the relevant spec. No Playwright config change is required. Add a shared fixture only if many tests need the same setup and automatic lifecycle management.

## 9. Seeded/reproducible data

For a failure that must be reproduced, Faker supports seeding. Set a known seed at the beginning of a dedicated test run or test setup, and record that seed with the failure. Avoid changing a global seed concurrently from parallel tests because that can make generated sequences interfere with one another. UUID-based uniqueness should remain in place even when a seed is used.

## 10. Cleanup and persistence

- Generated object: exists only in test memory until used.
- UI-created record: clean up through UI if the app supports deletion.
- API-created record: clean up through an API delete operation if supported.
- Fixture teardown: put cleanup in `try/finally` around `await use(resource)`.

Never assume that creating a factory object created a real user, order, book or database record.

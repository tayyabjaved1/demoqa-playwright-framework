import { faker } from '@faker-js/faker';

/** Shared primitives: factories compose these instead of duplicating generators. */
export const CommonGenerator = {
  id: () => faker.string.uuid(),
  firstName: () => faker.person.firstName(),
  lastName: () => faker.person.lastName(),
  fullName: () => faker.person.fullName(),
  email: () => `qa.${faker.string.uuid()}@example.com`,
  username: () => `qa_${faker.string.alphanumeric(12).toLowerCase()}`,
  password: () => `Qa!${faker.string.alphanumeric(12)}9`,
  phone: () => faker.string.numeric(10),
  address: () => faker.location.streetAddress(),
  city: () => faker.location.city(),
  date: () => faker.date.birthdate({ min: 18, max: 45, mode: 'age' }),
  integer: (min: number, max: number) => faker.number.int({ min, max }),
  pick: <T>(values: readonly T[]): T => faker.helpers.arrayElement([...values])
};

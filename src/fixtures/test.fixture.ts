import { test as base, expect } from '@playwright/test';
import { UserFactory } from '../data/factories/user.factory';
import { StudentFactory } from '../data/factories/student.factory';
import { FormFactory } from '../data/factories/form.factory';
import { BookFactory } from '../data/factories/book.factory';
import { TextBoxPage } from '../pages/elements/text-box.page';
import { PracticeFormPage } from '../pages/forms/practice-form.page';
import { BookStoreClient, type BookStoreAccount } from '../api/bookstore.client';

const apiBaseURL = process.env.API_BASE_URL ?? 'https://demoqa.com';

type FrameworkFixtures = {
  user: ReturnType<typeof UserFactory.create>;
  adminUser: ReturnType<typeof UserFactory.admin>;
  student: ReturnType<typeof StudentFactory.create>;
  textBoxData: ReturnType<typeof FormFactory.textBox>;
  bookCatalog: ReturnType<typeof BookFactory.catalog>;
  textBoxPage: TextBoxPage;
  practiceFormPage: PracticeFormPage;
  bookStoreClient: BookStoreClient;
  bookStoreAccount: BookStoreAccount;
};

export const test = base.extend<FrameworkFixtures>({
  user: async ({}, use) => { await use(UserFactory.create()); },
  adminUser: async ({}, use) => { await use(UserFactory.admin()); },
  student: async ({}, use) => { await use(StudentFactory.create()); },
  textBoxData: async ({}, use) => { await use(FormFactory.textBox()); },
  bookCatalog: async ({}, use) => { await use(BookFactory.catalog()); },
  textBoxPage: async ({ page }, use) => { await use(new TextBoxPage(page)); },
  practiceFormPage: async ({ page }, use) => { await use(new PracticeFormPage(page)); },
  bookStoreClient: async ({ request }, use) => { await use(new BookStoreClient(request, apiBaseURL)); },
  bookStoreAccount: async ({ bookStoreClient }, use) => {
    const account = await bookStoreClient.createAccount(UserFactory.bookstoreUser());
    try { await use(account); }
    finally { await bookStoreClient.deleteAccount(account); }
  }
});

export { expect };

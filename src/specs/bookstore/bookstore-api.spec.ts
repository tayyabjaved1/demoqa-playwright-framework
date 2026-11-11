import { expect } from '@playwright/test';
import { test } from '../../fixtures/test.fixture';

test.describe('Book Store - API', { tag: ['@api', '@regression'] }, () => {
  test('creates a unique user, adds a catalog book and verifies the collection', async ({ bookStoreClient, bookStoreAccount, bookCatalog }) => {
    const book = bookCatalog[0];

    await test.step('Add the catalog book to the account', async () => {
      await bookStoreClient.addBook(bookStoreAccount, book.isbn);
    });

    await test.step('Verify the book appears in the account collection', async () => {
      const collection = await bookStoreClient.getBooks(bookStoreAccount);
      expect(collection.books.map(item => item.isbn)).toContain(book.isbn);
    });
  });
});

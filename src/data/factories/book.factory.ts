import type { BookData } from '../types/test-data.types';

// DemoQA's public Book Store catalog contains fixed ISBNs. Use known catalog records
// for add-to-collection UI/API scenarios; generate unique search terms for search tests.
export class BookFactory {
  static catalog(): BookData[] {
    return [
      { isbn: '9781449325862', title: 'Git Pocket Guide', author: 'Richard E. Silverman', publisher: "O'Reilly Media" },
      { isbn: '9781491904244', title: "You Don't Know JS", author: 'Kyle Simpson', publisher: "O'Reilly Media" },
      { isbn: '9781449331818', title: 'Learning JavaScript Design Patterns', author: 'Addy Osmani', publisher: "O'Reilly Media" }
    ];
  }
  static first(): BookData { return this.catalog()[0]; }
}

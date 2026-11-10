import type { APIRequestContext } from '@playwright/test';
import type { UserData } from '../data/types/test-data.types';

export interface BookStoreAccount { userId: string; token: string; user: UserData; }

export class BookStoreClient {
  constructor(private readonly request: APIRequestContext, private readonly baseURL: string) {}

  async createAccount(user: UserData): Promise<BookStoreAccount> {
    const response = await this.request.post(`${this.baseURL}/Account/v1/User`, {
      data: { userName: user.username, password: user.password }
    });
    if (!response.ok()) throw new Error(`DemoQA account creation failed (${response.status()}): ${await response.text()}`);
    const created = await response.json() as { userID: string };

    const tokenResponse = await this.request.post(`${this.baseURL}/Account/v1/GenerateToken`, {
      data: { userName: user.username, password: user.password }
    });
    if (!tokenResponse.ok()) throw new Error(`DemoQA token generation failed (${tokenResponse.status()}): ${await tokenResponse.text()}`);
    const tokenData = await tokenResponse.json() as { token: string; status: string; result: string };
    if (!tokenData.token) throw new Error(`DemoQA did not return an auth token: ${JSON.stringify(tokenData)}`);
    return { userId: created.userID, token: tokenData.token, user };
  }

  async addBook(account: BookStoreAccount, isbn: string): Promise<void> {
    const response = await this.request.post(`${this.baseURL}/BookStore/v1/Books`, {
      headers: { Authorization: `Bearer ${account.token}` },
      data: { userId: account.userId, collectionOfIsbns: [{ isbn }] }
    });
    if (!response.ok()) throw new Error(`Adding book failed (${response.status()}): ${await response.text()}`);
  }

  async getBooks(account: BookStoreAccount): Promise<{ books: Array<{ isbn: string }> }> {
    const response = await this.request.get(`${this.baseURL}/BookStore/v1/Books?UserId=${account.userId}`, {
      headers: { Authorization: `Bearer ${account.token}` }
    });
    if (!response.ok()) throw new Error(`Fetching book collection failed (${response.status()}): ${await response.text()}`);
    return await response.json() as { books: Array<{ isbn: string }> };
  }

  async deleteAccount(account: BookStoreAccount): Promise<void> {
    const response = await this.request.delete(`${this.baseURL}/Account/v1/User/${account.userId}`, {
      headers: { Authorization: `Bearer ${account.token}` }
    });
    // 404 can mean the account has already been removed; other errors should be visible.
    if (!response.ok() && response.status() !== 404) {
      throw new Error(`Account cleanup failed (${response.status()}): ${await response.text()}`);
    }
  }
}

import { expect, type Page } from '@playwright/test';
import { BasePage } from '../../core/base-page';
import type { TextBoxData } from '../../data/types/test-data.types';

export class TextBoxPage extends BasePage {
  readonly path = '/text-box';

  constructor(page: Page) { super(page); }

  async waitForLoaded(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'Text Box' })).toBeVisible();
  }

  async submit(data: TextBoxData): Promise<void> {
    await this.page.getByPlaceholder('Full Name').fill(data.fullName);
    await this.page.getByPlaceholder('name@example.com').fill(data.email);
    await this.page.getByPlaceholder('Current Address').fill(data.currentAddress);
    // Unlike the other fields on this page, DemoQA gives Permanent Address no placeholder/accessible name.
    await this.page.locator('#permanentAddress').fill(data.permanentAddress);
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }

  async expectSubmitted(data: TextBoxData): Promise<void> {
    // #output has no accessible role/label of its own — DemoQA's id for the result panel.
    const output = this.page.locator('#output');
    await expect(output).toContainText(data.fullName);
    await expect(output).toContainText(data.email);
    await expect(output).toContainText(data.currentAddress);
    await expect(output).toContainText(data.permanentAddress);
  }
}

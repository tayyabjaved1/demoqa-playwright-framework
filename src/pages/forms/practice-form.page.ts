import { expect, type Page } from '@playwright/test';
import { BasePage } from '../../core/base-page';
import type { StudentData } from '../../data/types/test-data.types';

export class PracticeFormPage extends BasePage {
  readonly path = '/automation-practice-form';

  constructor(page: Page) { super(page); }

  async waitForLoaded(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'Practice Form' })).toBeVisible();
  }

  async submit(student: StudentData): Promise<void> {
    await this.page.getByPlaceholder('First Name').fill(student.firstName);
    await this.page.getByPlaceholder('Last Name').fill(student.lastName);
    await this.page.getByPlaceholder('name@example.com').fill(student.email);
    await this.page.getByLabel(student.gender, { exact: true }).click();
    await this.page.getByPlaceholder('Mobile Number').fill(student.mobile);
    // react-datepicker's input exposes no accessible label/placeholder of its own.
    await this.page.locator('#dateOfBirthInput').fill(student.dateOfBirth);
    await this.page.locator('#dateOfBirthInput').press('Enter');
    await this.page.getByPlaceholder('Current Address').fill(student.address);
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }

  async expectSubmission(student: StudentData): Promise<void> {
    // Bootstrap's modal component exposes no accessible name distinguishing it from other dialogs.
    const modal = this.page.locator('.modal-content');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText(`${student.firstName} ${student.lastName}`);
    await expect(modal).toContainText(student.email);
    await expect(modal).toContainText(student.mobile);
  }
}

import type { Locator, Page } from '@playwright/test';
import { AdOverlay } from './ad-overlay';

/** Base class every page object extends: navigation, page-readiness contract and the shared data-testid lookup. */
export abstract class BasePage {
  protected constructor(protected readonly page: Page) {}

  /** The page's URL, relative to baseURL. Set by each page object. */
  abstract readonly path: string;

  /** Confirms the page has actually finished rendering, anchored on that page's own elements. */
  abstract waitForLoaded(): Promise<void>;

  async goto(): Promise<void> { await this.page.goto(this.path); }

  /** Navigates to the page, clears DemoQA's ad overlay if present, and waits until the page is ready to interact with. */
  async open(): Promise<void> {
    await this.goto();
    await new AdOverlay(this.page).dismissIfPresent();
    await this.waitForLoaded();
  }

  protected testId(id: string): Locator { return this.page.getByTestId(id); }
}

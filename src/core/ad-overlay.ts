import type { Page } from '@playwright/test';

/** Best-effort removal of DemoQA's ad banner/iframes, which can overlap page content and intercept clicks.
 * Incidental cleanup only — never use to verify behaviour under test. */
export class AdOverlay {
  constructor(private readonly page: Page) {}

  async dismissIfPresent(): Promise<void> {
    await this.page
      .evaluate(() => {
        document.getElementById('fixedban')?.remove();
        document.querySelectorAll('iframe[id^="google_ads"]').forEach((el) => el.remove());
      })
      .catch(() => {});
  }
}

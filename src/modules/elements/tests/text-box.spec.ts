import { test } from '../../../fixtures/test.fixture';

test.describe('Elements - Text Box', { tag: ['@smoke', '@ui'] }, () => {
  test('submits generated text-box data and verifies the output', async ({ textBoxPage, textBoxData }) => {
    await test.step('Open the Text Box page', async () => {
      await textBoxPage.open();
    });

    await test.step('Submit the generated text-box data', async () => {
      await textBoxPage.submit(textBoxData);
    });

    await test.step('Verify the output panel shows the submitted data', async () => {
      await textBoxPage.expectSubmitted(textBoxData);
    });
  });
});

import { test } from '../../../fixtures/test.fixture';

test.describe('Forms - Practice Form', { tag: ['@regression', '@ui'] }, () => {
  test('submits a dynamically generated student profile', async ({ practiceFormPage, student }) => {
    await test.step('Open the Practice Form page', async () => {
      await practiceFormPage.open();
    });

    await test.step('Submit the generated student profile', async () => {
      await practiceFormPage.submit(student);
    });

    await test.step('Verify the confirmation modal shows the submitted profile', async () => {
      await practiceFormPage.expectSubmission(student);
    });
  });
});

import { test, expect } from '@playwright/test';

test('should open the example page', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Example Domain/);
});
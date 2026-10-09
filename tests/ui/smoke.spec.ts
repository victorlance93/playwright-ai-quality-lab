import { test, expect } from '../../fixtures/test.fixture';

test('should open ServeRest application', async ({ page }) => {

    await page.goto('/');

    await expect(page).toHaveTitle(/Front - ServeRest/);
});
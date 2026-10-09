import { test, expect } from '../../fixtures/test.fixture';

test.describe('Login', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
    });

    test('should display the login page', async ({ loginPage }) => {

        await expect(loginPage.emailInput).toBeVisible();
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();
    }
    );

    test('should display validation when submitting empty credentials', async ({ loginPage }) => {

        await loginPage.loginButton.click();

        await expect(
            loginPage.emailRequiredMessage
        ).toBeVisible();

        await expect(
            loginPage.passwordRequiredMessage
        ).toBeVisible();
    }
    );

    test('should login successfully with a user created by API', async ({ page, loginPage, homePage, testUser }) => {

        await loginPage.login(
            testUser.user.email,
            testUser.user.password
        );

        await expect(page).toHaveURL(/home/);

        await expect(
            homePage.welcomeHeading
        ).toBeVisible();
    }
    );

});
import { test, expect } from '@playwright/test';

test.describe('Login', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/login');
    });

    test('should display the login page', async ({ page }) => {
        const emailInput = page.getByTestId('email');
        const passwordInput = page.getByTestId('senha');
        const loginButton = page.getByTestId('entrar');

        await expect(emailInput).toBeVisible();
        await expect(passwordInput).toBeVisible();
        await expect(loginButton).toBeVisible();
    });

    test('should display validation when submitting empty credentials', async ({ page }) => {
        const loginButton = page.getByTestId('entrar');

        await loginButton.click();

        await expect(page.getByText('Email é obrigatório')).toBeVisible();
        await expect(page.getByText('Password é obrigatório')).toBeVisible();
    });

    test('should login successfully with a user created by API', async ({ page, request }) => {

        const user = {
            nome: 'Playwright QA',
            email: `playwright.qa.${Date.now()}@teste.com`,
            password: 'teste123',
            administrador: 'true'
        };

        const response = await request.post(
            'https://serverest.dev/usuarios',
            {
                data: user
            }
        );

        expect(response.status()).toBe(201);

        await page.getByTestId('email').fill(user.email);
        await page.getByTestId('senha').fill(user.password);
        await page.getByTestId('entrar').click();

        await expect(page).toHaveURL(/home/);
    });

});
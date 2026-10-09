import { Page, Locator } from '@playwright/test';

export class LoginPage {

    readonly page: Page;

    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    readonly emailRequiredMessage: Locator;
    readonly passwordRequiredMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        this.emailInput = page.getByTestId('email');
        this.passwordInput = page.getByTestId('senha');
        this.loginButton = page.getByTestId('entrar');

        this.emailRequiredMessage =
            page.getByText('Email é obrigatório');

        this.passwordRequiredMessage =
            page.getByText('Password é obrigatório');
    }

    async login(
        email: string,
        password: string
    ): Promise<void> {

        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async goto(): Promise<void> {
        await this.page.goto('/login');
    }
}
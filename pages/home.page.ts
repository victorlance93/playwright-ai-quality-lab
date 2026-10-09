import { Page, Locator } from '@playwright/test';

export class HomePage {

    readonly page: Page;
    readonly welcomeHeading: Locator;

    constructor(page: Page) {
        this.page = page;

        this.welcomeHeading = page.getByRole('heading', { name: /Bem Vindo/ });
    }
}
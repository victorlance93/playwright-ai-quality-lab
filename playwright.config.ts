import { defineConfig } from '@playwright/test';
import { environment } from './config/environment';

export default defineConfig({
    testDir: './tests',

    retries: 1,

    use: {
        baseURL: environment.uiBaseUrl,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
    },
});
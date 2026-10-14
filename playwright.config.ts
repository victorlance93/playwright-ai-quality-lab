import { defineConfig } from '@playwright/test';
import { environment } from './config/environment';

export default defineConfig({
    testDir: './tests',

    reporter: [
        ['list'],
        ['html', {
            outputFolder: 'playwright-report',
            open: 'never'
        }],
        ['json', {
            outputFile: 'test-results/results.json'
        }],
    ],

    retries: 1,

    use: {
        baseURL: environment.uiBaseUrl,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
    },
});
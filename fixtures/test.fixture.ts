import {
    test as base,
    expect,
    request,
    APIRequestContext
} from '@playwright/test';

import { environment } from '../config/environment';

type TestFixtures = {
    api: APIRequestContext;
};

export const test = base.extend<TestFixtures>({
    api: async ({ }, use) => {
        const api = await request.newContext({
            baseURL: environment.apiBaseUrl,
        });

        await use(api);

        await api.dispose();
    },
});

export { expect };
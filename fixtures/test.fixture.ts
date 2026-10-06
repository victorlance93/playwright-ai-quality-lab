import {
    test as base,
    expect,
    request,
    APIRequestContext
} from '@playwright/test';

import { environment } from '../config/environment';
import { UsersApi } from '../api/users.api';

type TestFixtures = {
    api: APIRequestContext;
    usersApi: UsersApi;
};

export const test = base.extend<TestFixtures>({

    api: async ({ }, use) => {
        const api = await request.newContext({
            baseURL: environment.apiBaseUrl,
        });

        await use(api);

        await api.dispose();
    },

    usersApi: async ({ api }, use) => {
        const usersApi = new UsersApi(api);

        await use(usersApi);
    },

});

export { expect };
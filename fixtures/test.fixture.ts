import {
    test as base,
    expect,
    request,
    APIRequestContext
} from '@playwright/test';

import { environment } from '../config/environment';
import { UsersApi } from '../api/users.api';
import { User } from '../types/user';
import { createUserData } from '../data/user.factory';

type TestUser = {
    user: User;
    userId: string;
};

type TestFixtures = {
    api: APIRequestContext;
    usersApi: UsersApi;
    testUser: TestUser;
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

    testUser: async ({ usersApi }, use) => {

        const user = createUserData();

        const response = await usersApi.createUser(user);

        if (response.status() !== 201) {
            throw new Error(
                `Failed to create test user. Status: ${response.status()}`
            );
        }

        const responseBody = await response.json();

        const userId = responseBody._id;

        await use({
            user,
            userId
        });

        try {
            await usersApi.deleteUser(userId);
        } catch {
            // Cleanup should not hide the original test result
        }
    },

});

export { expect };
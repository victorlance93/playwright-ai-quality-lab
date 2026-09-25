import { test, expect } from '../../fixtures/test.fixture';
import { UsersApi } from '../../api/users.api';
import { createUserData } from '../../data/user.factory';

test.describe('Users API', () => {

    test('should create a new user', async ({ api }) => {

        const usersApi = new UsersApi(api);

        const user = createUserData();

        const response = await usersApi.createUser(user);

        expect(response.status()).toBe(201);

        const responseBody = await response.json();

        expect(responseBody.message)
            .toBe('Cadastro realizado com sucesso');

        expect(responseBody._id).toBeTruthy();
    });

});
import { test, expect } from '../../fixtures/test.fixture';
import { createUserData } from '../../data/user.factory';

test.describe('Users API', () => {

    test('should create a new user', async ({ usersApi }) => {

        const user = createUserData();

        const response = await usersApi.createUser(user);

        expect(response.status()).toBe(201);

        const responseBody = await response.json();

        expect(responseBody.message)
            .toBe('Cadastro realizado com sucesso');

        expect(responseBody._id).toBeTruthy();
    });

    test('should get a user by id', async ({ usersApi, testUser }) => {

        const response =
            await usersApi.getUserById(testUser.userId);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(responseBody.nome)
            .toBe(testUser.user.nome);

        expect(responseBody.email)
            .toBe(testUser.user.email);

        expect(responseBody.password)
            .toBe(testUser.user.password);

        expect(responseBody.administrador)
            .toBe(testUser.user.administrador);
    }
    );
    test('should update an existing user', async ({ usersApi, testUser }) => {

        const updatedUser = createUserData({
            nome: 'Playwright Updated User',
            email: `playwright.updated.${Date.now()}@teste.com`
        });

        const updateResponse = await usersApi.updateUser(
            testUser.userId,
            updatedUser
        );

        expect(updateResponse.status()).toBe(200);

        const getResponse = await usersApi.getUserById(
            testUser.userId
        );

        expect(getResponse.status()).toBe(200);

        const getBody = await getResponse.json();

        expect(getBody.nome).toBe(updatedUser.nome);
        expect(getBody.email).toBe(updatedUser.email);
        expect(getBody.password).toBe(updatedUser.password);
        expect(getBody.administrador)
            .toBe(updatedUser.administrador);
    }
    );

    test('should delete an existing user', async ({ usersApi, testUser }) => {

        const deleteResponse = await usersApi.deleteUser(
            testUser.userId
        );

        expect(deleteResponse.status()).toBe(200);

        const deleteBody = await deleteResponse.json();

        expect(deleteBody.message)
            .toBe('Registro excluído com sucesso');

        const getResponse = await usersApi.getUserById(
            testUser.userId
        );

        expect(getResponse.status()).toBe(400);
    }
    );

});
import { User } from '../types/user';

export function createUserData(
    overrides: Partial<User> = {}
): User {

    const user: User = {
        nome: 'Playwright QA',
        email: `playwright.qa.${Date.now()}@teste.com`,
        password: 'teste123',
        administrador: 'true'
    };

    return {
        ...user,
        ...overrides
    };
}
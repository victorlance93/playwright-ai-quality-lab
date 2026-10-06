import {
    APIRequestContext,
    APIResponse
} from '@playwright/test';

import { User } from '../types/user';

export class UsersApi {

    constructor(
        private readonly api: APIRequestContext
    ) { }

    async createUser(user: User): Promise<APIResponse> {
        return await this.api.post('/usuarios', {
            data: user
        });
    }

    async getUserById(userId: string): Promise<APIResponse> {
        return await this.api.get(`/usuarios/${userId}`);
    }

    async updateUser(
        userId: string,
        user: User
    ): Promise<APIResponse> {
        return await this.api.put(`/usuarios/${userId}`, {
            data: user
        });
    }

    async deleteUser(userId: string): Promise<APIResponse> {
        return await this.api.delete(`/usuarios/${userId}`);
    }
}
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
}
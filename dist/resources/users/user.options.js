const User = {
    type: 'object',
    properties: {
        id: { type: 'string', format: 'uuid', nullable: true },
        name: { type: 'string' },
        login: { type: 'string' },
        password: { type: 'string' },
    }
};
export const UserWitoutPassword = {
    type: 'object',
    properties: {
        id: { type: 'string', format: 'uuid', nullable: true },
        name: { type: 'string' },
        login: { type: 'string' },
    }
};
const message = {
    type: 'object',
    properties: {
        message: { type: 'string' }
    }
};
export const getUsersOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: UserWitoutPassword
            }
        }
    }
};
export const getUserOpts = {
    schema: {
        params: {
            userId: { type: 'string', format: 'uuid' },
        },
        response: {
            201: UserWitoutPassword,
            404: message
        }
    }
};
export const postUserOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['name', 'login', 'password'],
            properties: {
                name: { type: 'string' },
                login: { type: 'string' },
                password: { type: 'string' },
            },
        },
        response: {
            201: User
        }
    }
};
export const deleteUserOpts = {
    schema: {
        params: {
            userId: { type: 'string', format: 'uuid' },
        },
        response: {
            404: message,
            200: message
        }
    }
};
export const updateUserOpts = {
    schema: {
        params: {
            userId: { type: 'string', format: 'uuid' },
        },
        body: {
            type: 'object',
            required: ['name', 'login', 'password'],
            properties: {
                name: { type: 'string' },
                login: { type: 'string' },
                password: { type: 'string' },
            },
        },
        response: {
            200: User,
            404: message
        }
    }
};
//# sourceMappingURL=user.options.js.map
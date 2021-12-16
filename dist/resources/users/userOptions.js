export const User = {
    type: 'object',
    properties: {
        id: { type: 'string', format: 'uuid' },
        name: { type: 'string' },
        login: { type: 'string' },
        password: { type: 'string' },
    }
};
export const UserWitoutPassword = {
    type: 'object',
    properties: {
        id: { type: 'string', format: 'uuid' },
        name: { type: 'string' },
        login: { type: 'string' },
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
    },
    handler: getUsers
};
export const getUserOpts = {
    schema: {
        params: {
            id: { type: 'string', format: 'uuid' },
        },
        response: {
            201: UserWitoutPassword
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
            id: { type: 'string', format: 'uuid' },
        },
        response: {
            404: {
                type: 'object',
                properties: {
                    message: { type: 'string' }
                }
            },
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' }
                }
            }
        }
    }
};
export const updateUserOpts = {
    schema: {
        params: {
            id: { type: 'string', format: 'uuid' },
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
            200: User
        }
    },
    handler: updateUser
};
//# sourceMappingURL=userOptions.js.map
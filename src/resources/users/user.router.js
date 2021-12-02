
import { getUser, getUsers, addUser, deleteUser, updateUser } from './user.service.js'

// User with password
const User = {
    type: 'object',
    properties: {
        id: {type: 'string'},
        name: {type: 'string'},
        login: {type: 'string'},
        password: {type: 'string'},
    }
}

// User without password
const UserWitoutPassword = {
    type: 'object',
    properties: {
        id: {type: 'string'},
        name: {type: 'string'},
        login: {type: 'string'},
       // password: {type: 'string'},
    }
}

// Options to get all users
const getUsersOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: UserWitoutPassword
            }
        }
    },
    handler: getUsers
}

// Options to get one user
const getUserOpts = {
    schema: {

        params:  {
            id: { type: 'string' },
          },

        response: {
            200: UserWitoutPassword
        }

    },
    handler: getUser
}

// Options to add one item
const postUserOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['name','login','password'],
            properties: {
                name: { type: 'string'},
                login: { type: 'string'},
                password: { type: 'string'},
            },
        },
        response: {
            201: User
        }
    },
    handler: addUser
}

// Options to delete one item
const deleteUserOpts = {
    schema: {

        params:  {
            id: { type: 'string' },
          },
        response: {
            204: {
                type: 'object',
                properties: {
                    message: { type: 'string'}
                }
            }
        }
    },
    handler: deleteUser
}

const updateUserOpts = {
    schema: {

        params:  {
            id: { type: 'string' },
          },

        body: {
            type: 'object',
            required: ['name','login','password'],
            properties: {
                name: { type: 'string'},
                login: { type: 'string'},
                password: { type: 'string'},
            },
        },
        response: {
            200: User
        }
    },
    handler: updateUser
}




function userRouter(fastify, options, done) {
    // Get all items
    fastify.get('/users', getUsersOpts )
    // Get single item
    fastify.get('/users/:id', getUserOpts )
    // Add item
    fastify.post('/users', postUserOpts )
    // Delete item
    fastify.delete('/users/:id', deleteUserOpts )
    // Update item
    fastify.put('/users/:id', updateUserOpts )

    done()
}

export default  userRouter
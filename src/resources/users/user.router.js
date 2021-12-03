
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
            201: UserWitoutPassword
        }

    }
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
    }
}

// Options to delete one item
const deleteUserOpts = {
    schema: {

        params:  {
            id: { type: 'string' },
          },
        response: {
            404: {
                type: 'object',
                properties: {
                    message: { type: 'string'}
                }
            },
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string'}
                }
            }
        }
    }
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

    fastify.get('/users/:id', getUserOpts, async (request, reply) => {
        const item = await getUser(request)
        const statusCode = item ? 200 : 404 
        reply
          .code(statusCode)
          .header('Content-Type', 'application/json; charset=utf-8')
          .send(item)
      })

    // Add item
    fastify.post('/users', postUserOpts, async (request, reply) => {
        const newUser = await addUser(request)
        reply
          .code(201)
          .header('Content-Type', 'application/json; charset=utf-8')
          .send(newUser)
      })

    // Delete item
    fastify.delete('/users/:id', deleteUserOpts, async (request, reply) => {
        const message = await deleteUser(request)
        reply
          .code(200)
          .header('Content-Type', 'application/json; charset=utf-8')
          .send(message)
      })



    // Update item
    fastify.put('/users/:id', updateUserOpts )

    done()
}

export default  userRouter
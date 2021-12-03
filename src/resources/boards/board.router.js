
import { getBoard, getBoards, addBoard, deleteBoard, updateBoard } from './board.service.js'

// Board scheme
const Board = {
    type: 'object',
    properties: {
        id: {type: 'string'},
        title: {type: 'string'},
        columns: {type: 'array'}
    }
}


// Options to get all boards
const getBoardsOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: Board
            }
        }
    },

    handler: getBoards
}

// Options to get one board
const getBoardOpts = {
    schema: {
        params:  {
            id: { type: 'string' },
          },
        response: {
            201: Board
        }
    }
}

// Options to add one board
const createBoardOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['title','columns'],
            properties: {
                title:   { type: 'string'},
                columns: { type: 'array'}
            },
        },
        response: {
            201: Board
        }
    }
}

// Options to delete one board
const deleteBoardOpts = {
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

const updateBoardOpts = {
    schema: {
        params:  {
            id: { type: 'string' },
          },
        body: {
            type: 'object',
            required: ['title','columns'],
            properties: {
                title: { type: 'string'},
                columns: { type: 'array'}
            },
        },
        response: {
            200: {
                type: 'array',
                items: Board
            }
        }
    },
    handler: updateBoard
}


function boardRouter(fastify, options, done) {
    
    // Get all boards
    fastify.get('/boards', getBoardsOpts )
    
    // Get single board
    fastify.get('/boards/:id', getBoardOpts, async (request, reply) => {
        const item = await getBoard(request)
        const statusCode = item ? 200 : 404
        reply
          .code(statusCode)
          .header('Content-Type', 'application/json; charset=utf-8')
          .send(item)
    })

    // Add board
    fastify.post('/boards', createBoardOpts, async (request, reply) => {
        const newBoard = await addBoard(request)
        reply
          .code(201)
          .header('Content-Type', 'application/json; charset=utf-8')
          .send(newBoard[0])
      })

    // Delete board
    fastify.delete('/boards/:id', deleteBoardOpts, async (request, reply) => {
        const {statusCode, message} = await deleteBoard(request)
        reply
          .code(statusCode)
          // .header('Content-Type', 'application/json; charset=utf-8')
          .send(message)
      })

    // Update board
    fastify.put('/boards/:id', updateBoardOpts )

    done()
}

export default  boardRouter
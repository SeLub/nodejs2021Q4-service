// Board scheme
const Board = {
      type: 'object',
      properties: {
          id: {type: 'string', format: 'uuid', nullable: true },
          title: {type: 'string'},
          columns: {type: 'array'}
      }
  }

const message = {
    type: 'object',
    properties: {
        message: { type: 'string'}
    }
}
  
  // Options to get all boards
export const getBoardsOpts = {
      schema: {
          response: {
              200: {
                  type: 'array',
                  items: Board
              }
          }
      }
  }
  
  // Options to get one board
export const getBoardOpts = {
      schema: {
          params:  {
            boardId: { type: 'string', format: 'uuid' }
            },
          response: {
              200: Board,
              404: message  
          }
      }
  }
  
  // Options to add one board
export const createBoardOpts = {
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
export const deleteBoardOpts = {
      schema: {
          params:  {
            boardId: { type: 'string', format: 'uuid' },
            },
          response: {
              404: message,
              200: message
          }
      }
  }
  
export const updateBoardOpts = {
      schema: {
          params:  {
            boardId: { type: 'string', format: 'uuid' },
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
              200: Board,
              404: message
          }
      }
  }
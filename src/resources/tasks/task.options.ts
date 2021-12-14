// Task scheme
const Task = {
      type: 'object',
      properties: {
          id: {type: 'string', nullable: true, format: 'uuid'},
          title: {type: 'string'},
          order: {type: 'number'},
          description: {type: 'string'},
          userId: {type: 'string', nullable: true, format: 'uuid'},
          boardId: {type: 'string', nullable: true, format: 'uuid'},
          columnId: {type: 'string', nullable: true, format: 'uuid'}
      }
  }
  
const message = {
                type: 'object',
                properties: {
                    message: { type: 'string'}
                }
}
  
  // Options get all tasks
export const getTasksOpts = {
      schema: {
          response: {
              200: {
                  type: 'array',
                  items: Task
              }
          }
      },
  }
  
  // Options get by ID Task
export const getTaskOpts = {
      schema: {
          params:  {
              boardId: { type: 'string', format: 'uuid' },
              taskId: { type: 'string', format: 'uuid' },
            },
          response: {
              200: Task,
              404: message
          }
          
      }
  }
  
  // Options create Task
export const createTaskOpts = {
      schema: {
        params:  {
            boardId: { type: 'string', format: 'uuid' }
          },
          body: {
              type: 'object',
              required: ['title','order','description','userId'],
              properties: {
                  title:   { type: 'string'},
                  order: { type: 'number'},
                  description: { type: 'string'},
                  userId: { type: 'string', nullable: true, format: 'uuid' },
                  columnId: { type: 'string', nullable: true, format: 'uuid' }
              },
          },
          response: {
              201: Task
          }
      }
  }
  
  // Options to delete one task
export const deleteTaskOpts = {
      schema: {
          params:  {
              boardId: { type: 'string', format: 'uuid' },
              taskId: { type: 'string', format: 'uuid' },
            },
          response: {
              404: message,
              200: message
          }
      }
  }
  
export const updateTaskOpts = {
      schema: {
          params:  {
              boardId: { type: 'string', format: 'uuid' },
              taskId: { type: 'string', format: 'uuid' },
            },
          body: {
              type: 'object',
              required: ['title','order','description','userId', 'columnId'],
              properties: {
                  title:   { type: 'string'},
                  order: { type: 'number'},
                  description: { type: 'string'},
                  userId: { type: 'string', nullable: true, format: 'uuid'},
                  columnId: { type: 'string', nullable: true, format: 'uuid'}
              },
          },
          response: {
              200: Task,
              404: message
          }
      }
  }
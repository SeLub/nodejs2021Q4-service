import Fastify, {FastifyInstance, RouteShorthandOptions} from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'; // config.ts
import { PORT } from './common/config.js';

const ServerPort = PORT || 3000;
// import SwaggerPlugin from 'fastify-swagger'

// import userRouter from './resources/users/user.router.js'
// import boardRouter from './resources/boards/board.router.js'
// import taskRouter from './resources/tasks/task.router.js'

const server: FastifyInstance< Server, IncomingMessage, ServerResponse > = Fastify({ logger: true,  ignoreTrailingSlash: true, caseSensitive: false });

// server.register(SwaggerPlugin, 
//   {   exposeRoute: true,
//       routePrefix:'/api-docs',
//       swagger: {
//           info: { title: 'REST service'},
//       },
//   })

// server.register(userRouter)
// server.register(boardRouter)
// server.register(taskRouter)


  interface RequestParams {
    userId?: string;
    boardId?: string;
    taskd?: string;
  }
    
//   interface RequestBody {
//     name?: string;
//   }

  const opts: RouteShorthandOptions = {
    schema:{
        params:  {
            userId: { type: 'string' },
            boardId: { type: 'string' },
            taskId: { type: 'string' },
          }, 
    //   body: {
    //     type: 'object',
    //     properties: {
    //       name: {
    //         type: 'string'
    //       }
    //     }
    //   }
    }
  };
  


  server.get<{
    Params: RequestParams;
  //  Body: RequestBody;
  }>('/ping/:userId', opts, (request, reply) => {
    console.log(request.params); // this is of type `PingParams`
   // console.log(request.body); // this is of type `PingBody`
    reply.code(200).send({ pong: 'it worked!' });
  });

const start = async () => {
    try{
        await server.listen(ServerPort)
        console.log(`Server started successfully on PORT:${ServerPort}`);
    } catch(error){
        server.log.error(error)
        process.exit(1)
    }
}

start()
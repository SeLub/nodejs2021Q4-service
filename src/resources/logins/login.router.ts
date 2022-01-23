
import { FastifyPluginAsync } from "fastify"
import { getNewJWT } from './login.service.js';
import { User } from "../users/user.model";
import  userController from '../users/user.repository.js';

const loginRoutes: FastifyPluginAsync = async (fastify): Promise<void> => {
  
    fastify.post<{ Body: User }>('/', async (req, reply) => {      
     const user =  await userController.findByLogin(req.body.login);
     if (!user) {         
        reply.status(403);
        reply.send("User not found");
     }
     const token = await getNewJWT(user as User); 
     
     reply.status(200);
     reply.send({ token });
    });
}

export { loginRoutes };
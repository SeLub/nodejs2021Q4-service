import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { FastifyRequest, FastifyReply } from 'fastify';
import { JWT_SECRET_KEY, SALT } from '../../common/config.js';
import { User } from '../users/user.model.js';

const routesName = ["users", "boards", "tasks"];

export const getNewJWT = async (user: User) => jsonwebtoken.sign(
        { userId: user.id, login: user.login },
        JWT_SECRET_KEY || "secret-key",
        { expiresIn: '6h' }
    )

export const getHash = async (password: string) => {
    const salt = await bcrypt.genSalt(parseInt(SALT as string, 5));
    return bcrypt.hash(password, salt);
}

export const checkAuth = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const authString = req.headers.authorization;
        let checkUrl = false;
        routesName.forEach(router => {
            const result = req.url.indexOf(router);
            if (result !== -1) {
                checkUrl = true;
            }
        });       
        
        if (authString && checkUrl) {
            const token = authString.split(' ')[1];
            const token2 = token || '';
            jsonwebtoken.verify(token2, JWT_SECRET_KEY as string, (error) => {
                if(error) {
                    reply.code(401);
                    reply.send("Token is not valid");
                }
            })            
        } else if (checkUrl) {
            reply.code(401);
            reply.send("Token is not valid");
        }
    } catch (error) {
        reply.code(401);
        reply.send();
    }   
}
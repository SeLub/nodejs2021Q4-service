import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import { Connection } from 'typeorm'
import connectDB from '../db/typeorm.js'

// define options
export interface MyPluginOptions {
      myPluginOption: string
    }

const myPluginAsync: FastifyPluginAsync<MyPluginOptions> = async (fastify) => {
   //   fastify.decorateRequest('myPluginProp', 'super_secret_value')
   //   fastify.decorateReply('myPluginProp', options.myPluginOption)
      fastify.decorate('db', await connectDB())
    }

export default fp(myPluginAsync, '3.x')

declare module 'fastify' {
      export interface FastifyInstance {
          db: Connection
      }
  }

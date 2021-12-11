import app from "./app.js";
import { PORT } from './common/config.js'

const FASTIFY_PORT = Number(PORT) || 3000

const start = async () => {
      try{
          await app.listen(FASTIFY_PORT);
         // console.log(`🚀  Fastify server running on PORT:${FASTIFY_PORT}`);
      } catch(error){
          app.log.error(error)
          process.exit(1)
      }
    }
    
    start()
/**
 * Module Server Configuration
 * @module ServerConfiguration
 * @category Server
 */
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../../.env') })

export const { 
      PORT, 
      LOG_LEVEL,
      POSTGRES_HOST = "db",
      POSTGRES_PORT = 5432,
      POSTGRES_USER = "postgres",
      POSTGRES_PASSWORD = "123456",
      POSTGRES_DB = "postgres"
} = process.env


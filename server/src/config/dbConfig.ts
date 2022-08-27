import dotenv from 'dotenv'
import path from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const environment = dotenv.config({ path: path.join(__dirname, '..', '..', `.env.${process.env.NODE_ENV}`)})

if (environment.error) {
    throw new Error("Enviroment config file not found")
}

const dbConfig = {
    dbURL: `${process.env.DB_URI}:${process.env.DB_PORT}` as string,
    dbPort: process.env.DB_PORT,
    dbUser: process.env.DB_USER || undefined,
    dbPwd: process.env.DB_PWD || undefined,
    dbAuthSource: process.env.DB_AUTH_SOURCE || undefined,
}

export default dbConfig

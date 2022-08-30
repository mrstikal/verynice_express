import dotenv from 'dotenv'
import path from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const environment = dotenv.config({ path: path.join(__dirname, '..', '..', `.env.${process.env.NODE_ENV}`)})

if (environment.error) {
    throw new Error("Enviroment config file not found")
}

const jwtConfig = {
    jwtSecret: process.env.JWT_SECRET as string,
    jwtExpiration: Number(process.env.JWT_EXPIRATION),
}

export default jwtConfig

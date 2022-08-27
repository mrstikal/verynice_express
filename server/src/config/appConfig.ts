import dotenv from 'dotenv'
import path from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const environment = dotenv.config({ path: path.join(__dirname, '..', '..', `.env.${process.env.NODE_ENV}`)})

if (environment.error) {
    throw new Error("Enviroment config file not found")
}

const appConfig = {
    dbURL: process.env.DB_URI as string,
    expressPort: process.env.DB_URL || 5000,
    viewEngine: process.env.VIEW_ENGINE || 'pug',
    viewPath: process.env.VIEW_PATH || 'view',
    staticPath: process.env.STATIC_PATH || 'public'
}

export default appConfig

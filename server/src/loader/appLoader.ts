import express from 'express'
import path from 'path'
import appConfig from '../config/appConfig'
import {fileURLToPath} from 'url'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const runServer = () => {

    const app = express()

    app.set('views', path.join(__dirname, '..', appConfig.viewPath))
    app.set('view engine', appConfig.viewEngine)
    app.use(express.static(path.join(__dirname, '..', appConfig.staticPath)))
    app.use(express.json())
    app.use(helmet())
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    app.listen(appConfig.expressPort, () => {
        console.log(`Server naslouchá na portu http://localhost:${appConfig.expressPort}`)
    }).on('error', err => {
        console.log(err)
        process.exit(1)
    });

    return app
}

const expressApp = runServer()

export default expressApp
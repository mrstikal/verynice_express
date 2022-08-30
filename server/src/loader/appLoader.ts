import express from 'express'
import path from 'path'
import appConfig from '../config/appConfig'
import { fileURLToPath } from 'url'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'
import expressSession from 'express-session'
import passport from 'passport'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const runServer = () => {

    const app = express()

    const session = expressSession(
        {
            secret: appConfig.sessionSecret,
            resave: false,
            saveUninitialized: false
        }
    )

    app.set('views', path.join(__dirname, '..', appConfig.viewPath))
    app.set('view engine', appConfig.viewEngine)
    app.use(express.static(path.join(__dirname, '..', appConfig.staticPath)))
    app.use(express.json())
    app.use(helmet())
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(session)
    app.use(passport.initialize())
    app.use(passport.session())

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
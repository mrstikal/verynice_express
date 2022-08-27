import { Router, Request, Response } from 'express'
import appConfig from '../config/appConfig'
import dbConfig from '../config/dbConfig'

const indexRouter: Router = Router()

indexRouter.get('/', (req: Request, res: Response) => {
    res.render('index', { 
        title: 'Express Server', 
        notice_sever: `Express Server runs on Port ${appConfig.expressPort}`,
        notice_db: `MongoDB runs on Port ${dbConfig.dbPort}`,
    });
})


export default indexRouter
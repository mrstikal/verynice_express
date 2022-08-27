import indexRouter from './route/index'
import expressApp from './loader/appLoader'
import userApi from './api/v1/user'
import db from './loader/dbLoader'

const mongoDB = db;

expressApp.use(indexRouter)
userApi(expressApp)
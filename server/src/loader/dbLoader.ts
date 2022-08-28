import mongoose, { ConnectOptions } from 'mongoose'
import dbConfig from '../config/dbConfig'
import { Db } from 'mongodb'


const mongoDB = async (): Promise<Db> => {

    try {
        const connection = await mongoose.connect(dbConfig.dbURL,
            {
                user: 'administrator',
                pass: 'ghf78H668Vd9',
                authSource: "admin",
                useNewUrlParser: true,
                useUnifiedTopology: true,
                dbName: 'verynice'
            } as ConnectOptions)

        console.log('MongoDB spuštěna na portu ', dbConfig.dbPort)
        return connection.connection.db

    } catch (err) {
        console.log('Failed to connect to MongoDB', err)
        process.exit(1)
    }
}

const db = await mongoDB()

export default db;